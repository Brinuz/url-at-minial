package router

import (
	"net/http"
	"url-at-minimal-server/internal/features/reverse"
	"url-at-minimal-server/internal/features/serve"

	"github.com/go-chi/chi"
)

// Middleware represents a middleware handler
type Middleware func(next http.Handler) http.Handler

// Router structure
type Router struct {
	serveStatic serve.Static
	reverseAPI  reverse.API
	middlewares []Middleware
}

// New New returns a valid instace of Router
func New(ss serve.Static, api reverse.API, mw []Middleware) *Router {
	return &Router{
		serveStatic: ss,
		reverseAPI:  api,
		middlewares: mw,
	}
}

// Handler is the router main handler
func (router Router) Handler() *chi.Mux {
	mux := chi.NewRouter()

	for _, mw := range router.middlewares {
		mux.Use(mw)
	}

	mux.Get("/health-check", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	mux.HandleFunc("/api/*", router.reverseAPI.Reverse)

	mux.Get("/*", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		router.serveStatic.Content().ServeHTTP(w, r)
	}))

	return mux
}
