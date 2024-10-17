package controllers

import (
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/database"
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/models"
	"github.com/gofiber/fiber/v2"
)

func CreateProduct(c *fiber.Ctx) error {
	product := new(models.Product)
	if err := c.BodyParser(product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Failed to parse request body"})
	}
	db := database.Connect()
	db.Create(&product)
	return c.Status(fiber.StatusCreated).JSON(product)
}

func GetProducts(c *fiber.Ctx) error {
	var products []models.Product

	db := database.Connect()

	db.Find(&products)
	return c.Status(fiber.StatusOK).JSON(products)
}

func getProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product
	db := database.Connect()
	if err := db.First(&product, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Product not found"})
	}
	return c.Status(fiber.StatusOK).JSON(product)
}
