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
	router := router.New(&MockStaticServer{}, &MockReverseAPI{}, []router.Middleware{})
	ms := httptest.NewServer(router.Handler())
	defer ms.Close()

	// When
	resp, err := http.Get(ms.URL + "/health-check")

	// Then
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

func TestMiddlewares(t *testing.T) {
	// Given
	middlewareCalled := 0
	dummyMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			middlewareCalled++
			next.ServeHTTP(w, r)
		})
	}
	middlewares := []router.Middleware{dummyMiddleware, dummyMiddleware}
	router := router.New(&MockStaticServer{}, &MockReverseAPI{}, middlewares)
	ms := httptest.NewServer(router.Handler())
	defer ms.Close()

	// When
	resp, err := http.Get(ms.URL + "/health-check")

	// Then
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
	assert.Equal(t, 2, middlewareCalled)
}

func TestApiReverseRoute(t *testing.T) {
	// Given
	mockReverse := &MockReverseAPI{
		ReverseFn: func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Reversed!"))
		},
	}
	router := router.New(&MockStaticServer{}, mockReverse, []router.Middleware{})
	ms := httptest.NewServer(router.Handler())
	defer ms.Close()

	// When
	resp, err := http.Get(ms.URL + "/api/endpoint")

	// Then
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)
	assert.Equal(t, 1, mockReverse.ReverseFnCount)
}

func TestStaticContentRoute(t *testing.T) {
	// Given
	mockStaticServer := &MockStaticServer{
		ContentFn: func() http.Handler {
			return http.FileServer(http.Dir("../../../stub"))
		},
	}
	router := router.New(mockStaticServer, &MockReverseAPI{}, []router.Middleware{})
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

type MockReverseAPI struct {
	ReverseFn      func(http.ResponseWriter, *http.Request)
	ReverseFnCount int
}

func (m *MockReverseAPI) Reverse(w http.ResponseWriter, r *http.Request) {
	m.ReverseFnCount++
	m.ReverseFn(w, r)
}
