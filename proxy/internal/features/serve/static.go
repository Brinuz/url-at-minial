package serve

import "net/http"

// Static represents a static content server
type Static interface {
	Content() http.Handler
}

// StaticServer structure
type StaticServer struct {
	contentPath string
}

// New returns a valid instace of Static
func New(cp string) *StaticServer {
	return &StaticServer{
		contentPath: cp,
	}
}

// Content returns an handler serving the static content
func (s StaticServer) Content() http.Handler {
	return http.FileServer(http.Dir(s.contentPath))
}
