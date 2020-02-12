# Building proxy container
FROM golang:latest AS proxy_builder
ADD . /app
WORKDIR /app/server
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o ../bin/server cmd/main.go

# Building frontend container
FROM node:alpine AS frontend_builder
ADD . /app
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Running container
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=server_builder /app/bin/ ./app
COPY --from=frontend_builder /app/frontend/dist ./app/dist
WORKDIR /app/
RUN chmod +x ./server
EXPOSE 8080
CMD ./server