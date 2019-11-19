# URL Minifier

## Run locally on docker
##### Build container 
`> docker build -t url-at-minimal -f dockerfile .`

##### Run container
###### Attached: 
`> docker run -p 3000:8080 --env STATIC_CONTENT_PATH=dist -it url-at-minimal`
###### Dettached: 
`> docker run -p 3000:8080 --env STATIC_CONTENT_PATH=dist -d url-at-minimal`

##### Interact with container
`> docker exec -it <CONTAINER_ID> url-at-minimal sh`