package main

import (
	"log"

	"github.com/TMP-The-Major-Project/Thrift-Store/backend/database"
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/routes"
	"github.com/gofiber/fiber/v2"
)

func check(eText string, err error) {
	if err != nil {
		log.Fatalf("%v %v", eText, err)
	}
}

func main() {
	database.Connect()
	port := ":3001"
	app := fiber.New()

	routes.Routes(app)

	app.Listen(port)
}
