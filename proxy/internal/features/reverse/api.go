package reverse

import (
	"net/http"
	"net/http/httputil"
	"net/url"
)

// API interface
type API interface {
	Reverse(http.ResponseWriter, *http.Request)
}

// APIReverser structure
type APIReverser struct {
}

// New returns a valid instace of Static
func New() *APIReverser {
	return &APIReverser{}
}

// Reverse works as a reverse handler for the backend api
func (a *APIReverser) Reverse(w http.ResponseWriter, r *http.Request) {
	url, _ := url.Parse("http://api.com")

	// r.URL.Host = url.Host
	// r.URL.Scheme = url.Scheme
	// r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
	r.Host = url.Host

	httputil.NewSingleHostReverseProxy(url).ServeHTTP(w, r)
}
