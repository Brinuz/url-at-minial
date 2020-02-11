package middleware

import "net/http"

// ForceHTTPS middleware forces the use of HTTPS only
func ForceHTTPS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-Forwarded-Proto") != "https" {
			u := "https://" + r.Host + r.RequestURI
			http.Redirect(w, r, u, http.StatusMovedPermanently)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// HSTS middleware adds HSTS header to the response
func HSTS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Strict-Transport-Security", "max-age=31536000")
		next.ServeHTTP(w, r)
	})
}
