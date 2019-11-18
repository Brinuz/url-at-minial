package router_test

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	"url-at-minimal-server/internal/adapters/router"

	"github.com/stretchr/testify/assert"
)

func TestHealthCheck(t *testing.T) {
	// Given
	router := router.New(&MockStaticServer{})
	ms := httptest.NewServer(router.Handler())
	defer ms.Close()

	// When
	resp, err := http.Get(ms.URL + "/health-check")

	// Then
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

func TestStaticContentRoute(t *testing.T) {
	// Given
	mockStaticServer := &MockStaticServer{
		ContentFn: func() http.Handler {
			return http.FileServer(http.Dir("../../../stub"))
		},
	}
	router := router.New(mockStaticServer)
	ms := httptest.NewServer(router.Handler())
	defer ms.Close()

	// When
	resp, err := http.Get(ms.URL + "/page.html")

	// Then
	body, _ := ioutil.ReadAll(resp.Body)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
	assert.Equal(t, `<p>A page</p>`, string(body))
	assert.Equal(t, 1, mockStaticServer.ContentFnCount)
}

type MockStaticServer struct {
	ContentFn      func() http.Handler
	ContentFnCount int
}

func (m *MockStaticServer) Content() http.Handler {
	m.ContentFnCount++
	return m.ContentFn()
}
