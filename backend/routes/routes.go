package routes

import (
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	app.Get("/", controllers.HelloSender)
	app.Post("/login", controllers.Login)
	app.Post("/register", controllers.Register)
}
