package controllers

import (
	"context"
	"time"

	"github.com/TMP-The-Major-Project/Thrift-Store/backend/database"
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

var userCollection = database.UserData("users") // Get the MongoDB collection

// Register a new user
func Register(c *fiber.Ctx) error {
	var data map[string]string

	// Parse the request body
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Hash the password
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	// Create the user object
	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	// Insert the new user into the MongoDB collection
	_, err := userCollection.InsertOne(context.TODO(), user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "could not create user",
		})
	}

	return c.JSON(user)
}

// Login an existing user
func Login(c *fiber.Ctx) error {
	var data map[string]string

	// Parse the request body
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	// Find the user by email
	err := userCollection.FindOne(context.TODO(), bson.M{"email": data["email"]}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": "user not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "internal server error",
		})
	}

	// Compare the password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data["password"])); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	// Generate JWT token
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.ID.Hex(),                         // Use the MongoDB user ID
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // 1 day
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "could not login",
		})
	}

	// Set the JWT token as a cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

// Get the authenticated user
func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	// Parse JWT token
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	// Find the user by ID
	objID, _ := models.StringToID(claims.Issuer)
	err = userCollection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "user not found",
		})
	}

	return c.JSON(user)
}

// Logout the user
func Logout(c *fiber.Ctx) error {
	// Clear the JWT cookie
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
