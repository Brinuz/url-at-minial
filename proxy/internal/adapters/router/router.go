package router

import (
	"net/http"
	"url-at-minimal-server/internal/features/reverse"
	"url-at-minimal-server/internal/features/serve"

	"github.com/go-chi/chi"
)

// Router structure
type Router struct {
	serveStatic serve.Static
	reverseAPI  reverse.API
}

// New New returns a valid instace of Router
func New(ss serve.Static, api reverse.API) *Router {
	return &Router{
		serveStatic: ss,
		reverseAPI:  api,
	}
}

// Handler is the router main handler
func (router Router) Handler() *chi.Mux {
	mux := chi.NewRouter()

	mux.Get("/health-check", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	mux.HandleFunc("/api/*", router.reverseAPI.Reverse)

	mux.Get("/*", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		router.serveStatic.Content().ServeHTTP(w, r)
	}))

	return mux
}
