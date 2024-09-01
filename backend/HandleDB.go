package main

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewCLient(c *mongo.Client) *DataBase {
	return &DataBase{
		client: c,
	}
}

func NewServer(c *mongo.Client) *Server {
	return &Server{
		client: c,
	}
}

// Dummy Database
var products []string = []string{"Jeans", "Trousers", "Shirts"}

func (db *DataBase) run() error {
	call := db.client.Database("Thrift").Collection("Products")

	for _, v := range products {

		product := bson.M{
			"name": v,
		}

		if _, err := call.InsertOne(context.TODO(), product); err != nil {
			log.Printf("Failed to insert product %v: %v", v, err)
			return err
		}

		log.Printf("Inserted product: %v", v)

	}

	return nil
}
