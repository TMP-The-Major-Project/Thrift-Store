package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}
	runner := NewCLient(client)

	if err := runner.run(); err != nil {
		log.Fatalf("Error while running database %v", err)
	}

	server := NewServer(client)
	fmt.Println("Listening on port 3000...")
	http.HandleFunc("/products", server.handelProducts)
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
