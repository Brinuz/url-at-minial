package serve_test

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"url-at-minimal-server/internal/features/serve"

	"github.com/stretchr/testify/assert"
)

func TestStaticContent(t *testing.T) {
	// Given
	rec := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/page.html", nil)
	static := serve.New("../../../stub")

	// When
	static.Content().ServeHTTP(rec, req)

	// Then
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, `<p>A page</p>`, rec.Body.String())
}
