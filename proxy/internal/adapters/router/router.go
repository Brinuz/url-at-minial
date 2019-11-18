package router

import (
	"net/http"
	"url-at-minimal-server/internal/features/serve"

	"github.com/go-chi/chi"
)

// Router structure
type Router struct {
	serveStatic serve.Static
}

// New New returns a valid instace of Router
func New(ss serve.Static) *Router {
	return &Router{
		serveStatic: ss,
	}
}

// Handler is the router main handler
func (router Router) Handler() *chi.Mux {
	mux := chi.NewRouter()

	mux.Get("/health-check", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	mux.Get("/*", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		router.serveStatic.Content().ServeHTTP(w, r)
	}))

	return mux
}
