package middleware_test

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"url-at-minimal-server/internal/adapters/middleware"

	"github.com/stretchr/testify/assert"
)

func ok(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusOK) }

func TestForceSSL(t *testing.T) {
	// Given
	rec := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/", nil)
	req.Header.Add("X-Forwarded-Proto", "http")
	handler := http.HandlerFunc(ok)

	// When
	middleware.ForceHTTPS(handler).ServeHTTP(rec, req)

	// Then
	assert.Equal(t, http.StatusMovedPermanently, rec.Code)
	assert.Equal(t, "https://example.com/", rec.Header().Get("Location"))
}

func TestNoNeedForceSSL(t *testing.T) {
	// Given
	rec := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/", nil)
	req.Header.Add("X-Forwarded-Proto", "https")
	handler := http.HandlerFunc(ok)

	// When
	middleware.ForceHTTPS(handler).ServeHTTP(rec, req)

	// Then
	assert.Equal(t, http.StatusOK, rec.Code)
}
