package main

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"url-at-minimal-server/internal/adapters/middleware"
	"url-at-minimal-server/internal/adapters/router"
	"url-at-minimal-server/internal/features/reverse"
	"url-at-minimal-server/internal/features/serve"
)

func main() {
	router := router.New(
		serve.New(getStaticContentPath()),
		reverse.New(*getAPIURL()),
		getMiddlewares(),
	)
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

func getMiddlewares() []router.Middleware {
	mws := []router.Middleware{middleware.ForceHTTPS}
	env := os.Getenv("ENVIRONMENT")
	if env == "production" {
		mws = append(mws, middleware.HSTS)
	}
	return mws
}

func getAPIURL() *url.URL {
	apiURL := os.Getenv("API_URL")
	if apiURL == "" {
		log.Fatal("Missing env variable: API_URL")
	}
	url, err := url.Parse(apiURL)
	if err != nil {
		log.Fatal("Invalid url from env variable: API_URL")
	}
	return url
}

func getStaticContentPath() string {
	path := os.Getenv("STATIC_CONTENT_PATH")
	if path == "" {
		log.Fatal("Missing env variable: STATIC_CONTENT_PATH")
	}
	return path
}
