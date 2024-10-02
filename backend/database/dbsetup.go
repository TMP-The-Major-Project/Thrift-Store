package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

// DBSet initializes the MongoDB client and connects to the database
func DBSet() *mongo.Client {
	// Adjust your MongoDB URI accordingly
	uri := "mongodb://development:testpassword@localhost:27017"
	clientOptions := options.Client().ApplyURI(uri)

	// Create a new client and connect to MongoDB
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatalf("Error creating MongoDB client: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}

	// Ping the database to verify the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	fmt.Println("Successfully connected to MongoDB!")
	return client
}

// Initialize the MongoDB client
func init() {
	Client = DBSet()
}

// UserData returns a reference to the specified collection for user data
func UserData(collectionName string) *mongo.Collection {
	if Client == nil {
		log.Fatal("MongoDB client is not initialized")
	}
	collection := Client.Database("users").Collection(collectionName)
	return collection
}

// // ProductData returns a reference to the specified collection for product data
// func ProductData(collectionName string) *mongo.Collection {
// 	if Client == nil {
// 		log.Fatal("MongoDB client is not initialized")
// 	}
// 	collection := Client.Database("Ecommerce").Collection(collectionName)
// 	return collection
// }
//

