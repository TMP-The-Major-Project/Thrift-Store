package controllers

import (
	"log"

	"github.com/TMP-The-Major-Project/Thrift-Store/backend/database"
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/models"
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
		Name:     data["name"],
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

	db.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	// pass, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	return c.JSON("Nothing here for now!")
}
