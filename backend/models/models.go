package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User struct for handling user data
type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"` // MongoDB ObjectID
	Name     string             `bson:"name"`
	Email    string             `bson:"email"`
	Password []byte             `bson:"password"` // Store the hashed password
}

// StringToID converts a string to a primitive.ObjectID
func StringToID(s string) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(s)
}
