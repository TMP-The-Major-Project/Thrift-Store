package main

import "go.mongodb.org/mongo-driver/mongo"

type DataBase struct {
	client *mongo.Client
}

type Server struct {
	client *mongo.Client
}
