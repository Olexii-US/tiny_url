# To start project:

## 1

- start: 'redis-server'
- start: 'redis-cli'

## 2 Commands

- `npm start` production server start
- `npm run start:dev` development server start
- `npm tun test` start jest tests
- `npm run lint` start eslint project code test
- `npm lint:fix` start eslint project code test with easy error fix

## 3 Requests

- Creating tiny URL
  POST request on http://localhost:3000/api/create-tiny-url
  with JSON body {"url": "https:...."}

- Getting back tiny URL
  GET request on http://localhost:3000/api/:tinyUrl
  with req.params "......"

## 4 To start docker

- docker-compose up -d
