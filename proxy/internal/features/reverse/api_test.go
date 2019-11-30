package reverse_test

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
	"url-at-minimal-server/internal/features/reverse"

	"github.com/stretchr/testify/assert"
)

func TestReverseAPI(t *testing.T) {
	// Given
	ms := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		assert.Equal(t, "/potato?query=0", r.URL.String())
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Reversed!"))
	}))
	defer ms.Close()

	url, _ := url.Parse(ms.URL)
	req := httptest.NewRequest("POST", "/api/potato?query=0", nil)
	rec := httptest.NewRecorder()
	api := reverse.New(*url)

	// When
	http.HandlerFunc(api.Reverse).ServeHTTP(rec, req)
	body, _ := ioutil.ReadAll(rec.Body)

	// Then
	assert.Equal(t, http.StatusCreated, rec.Code)
	assert.Equal(t, "Reversed!", string(body))
}
