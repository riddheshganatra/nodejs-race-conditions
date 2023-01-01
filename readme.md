# description

example application to explain race conditions in node js


# start mongo db using docker

docker run -p 27017:27017 --name newsletter -d mongo:latest




# curl requests
- v1
```
curl --location --request POST 'localhost:3000/v1/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"test1@gmail.com"

}'
``` 


- v2
```
curl --location --request POST 'localhost:3000/v2/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"test1@gmail.com"

}'
``` 