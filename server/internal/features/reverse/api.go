package reverse

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

// API interface
type API interface {
	Reverse(http.ResponseWriter, *http.Request)
}

// APIReverser structure
type APIReverser struct {
	target url.URL
}

// New returns a valid instace of Static
func New(t url.URL) *APIReverser {
	return &APIReverser{
		target: t,
	}
}

// Reverse works as a reverse handler for the backend api
func (a *APIReverser) Reverse(w http.ResponseWriter, r *http.Request) {
	r.URL.Path = strings.Replace(r.URL.Path, "/api", "", 1)

	r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
	r.URL.Host = a.target.Host
	r.URL.Scheme = a.target.Scheme
	r.Host = a.target.Host

	httputil.NewSingleHostReverseProxy(&a.target).ServeHTTP(w, r)
}
