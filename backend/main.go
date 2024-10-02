package main

import (
	"log"

	"github.com/TMP-The-Major-Project/Thrift-Store/backend/controllers"
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/database"
	"github.com/gofiber/fiber/v2"
)

func main() {
	// Connect to the database
	database.DBSet()

	// Initialize the Fiber app
	app := fiber.New()

	// Define routes
	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Get("/user", controllers.User)
	app.Post("/logout", controllers.Logout)

	// Start the app
	log.Fatal(app.Listen(":3000"))
}
