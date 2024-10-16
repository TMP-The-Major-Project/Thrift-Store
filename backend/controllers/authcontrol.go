package controllers

import (
	"log"
	"strconv"
	"time"

	"github.com/TMP-The-Major-Project/Thrift-Store/backend/database"
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/models"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func HelloSender(c *fiber.Ctx) error {
	return c.SendString("Hello World")
}

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	pass, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	if err != nil {
		log.Fatal(err)
	}

	user := models.User{
		Username: data["username"],
		Email:    data["email"],
		Password: pass,
	}

	db := database.Connect()

	db.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	db := database.Connect()

	db.Where("username = ?", data["username"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadGateway)
		return c.JSON(fiber.Map{
			"message": "Invalid Username or Password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		// ExpiresAt: time.Now().Add(time.Hour*24).Unix(),
		Issuer: strconv.Itoa(int(user.Id)),
	})

	tokken, err := claims.SignedString([]byte(database.SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could Not Login!!",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokken,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(database.SecretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	db := database.Connect()

	db.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
