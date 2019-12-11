# URL Minifier (http://www.urldome.com)

## Run locally on docker
##### Build image 
`> docker build -t url-at-minimal:latest -f dockerfile .`

##### Run container
###### Attached: 
`> docker run -p 8080:8080 -it --name url-at-minimal --env STATIC_CONTENT_PATH=dist url-at-minimal:latest`
###### Dettached: 
`> docker run -p 8080:8080 -d --name url-at-minimal --env STATIC_CONTENT_PATH=dist url-at-minimal:latest`

##### Interact with container
`> docker exec -it url-at-minimal sh`

#### Test the page
`http://localhost:8080/`
