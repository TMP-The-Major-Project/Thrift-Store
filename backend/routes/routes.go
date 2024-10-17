package routes

import (
	"github.com/TMP-The-Major-Project/Thrift-Store/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	app.Get("/", controllers.HelloSender)
	app.Post("/login", controllers.Login)
	app.Post("/register", controllers.Register)
	app.Get("/user", controllers.User)
	app.Post("/logout", controllers.Logout)

	app.Post("/admin-register", controllers.AdminRegister)
	app.Post("/admin-login", controllers.AdminLogin)
	app.Post("/add-products", controllers.CreateProduct)
	app.Get("/products", controllers.GetProducts)
}
