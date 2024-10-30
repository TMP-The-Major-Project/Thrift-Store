# Start with a base image that includes Go
FROM golang:latest as builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files first to cache dependencies
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o bin/app .

# Create a new stage to create a smaller image for production
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/bin/app .

# Expose the port that the app listens on
EXPOSE 3001

# Command to run the executable
CMD ["./bin/app"]
