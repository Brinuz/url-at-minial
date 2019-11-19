package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"url-at-minimal-server/internal/adapters/router"
	"url-at-minimal-server/internal/features/serve"
)

func main() {
	router := router.New(serve.New(getStaticContentPath()))

	println("I'm up!")
	log.Fatal(http.ListenAndServe(getPort(), router.Handler()))
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return fmt.Sprintf(":%s", port)
}

func getStaticContentPath() string {
	path := os.Getenv("STATIC_CONTENT_PATH")
	if path == "" {
		log.Fatal("Missing env variable: STATIC_CONTENT_PATH")
	}
	return path
}
