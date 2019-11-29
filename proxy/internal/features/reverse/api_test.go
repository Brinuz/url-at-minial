package reverse_test

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"url-at-minimal-server/internal/features/reverse"

	"github.com/stretchr/testify/assert"
)

func TestReverseAPI(t *testing.T) {
	// Given
	req := httptest.NewRequest("GET", "/api/potato", nil)
	rec := httptest.NewRecorder()
	api := reverse.New()

	// When
	http.HandlerFunc(api.Reverse).ServeHTTP(rec, req)

	// Then
	assert.Equal(t, req.Host, "api.com")
}
