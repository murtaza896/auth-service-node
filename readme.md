# Node.js Authentication Service
* This is a NodeJS API that supports username and password authentication along with Google and Facebook SSO.

## Installation
### Docker File
* Use the Docker file present in the repository to build this application in docker container.
* `docker build -f dockerfile -t [tagName] --build-arg EUREKA_SERVER_URL=[eureka-discovery-server-url] --build-arg EUREKA_SERVER_URL=[eureka-discovery-server-port] .`
* This application is a eureka client so pass the build arguments to specify the discovery server url and port.
