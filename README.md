# da-beers-api
Manages a list of great beers.

## Getting started

Clone the repo, install dependencies, create env variables, create data base, load data, start de api.

```
$ git Clone https://github.com/migufernandez/da-beers-api.git
$ cd project directory
$ npm install

```

### Create environment variables

- Create a file named **.env** containing the following environment variables:
 - PORT=4000
 - COUCH_DB=NAMEOFTHEDATABASE
 - COUCH_URL=http://key:password@url

### Load data

// in the script ()
```
$ npm run load
```

###  Start API
- start de API on port 4000

```
$ npm start
```

- Open your browser: http://localhost:4000 and view the welcome message.
- Grab a beer. Browse to http://localhost:4000/beers/beer-corona

## BASICS GUIDE

### Base URL

- http://localhost:4000

### Routes

- /beers - describe this
- /brewer - describe this
- /beers/beer-corona - describe this


### Scheme

### HTTP verbs

- POST description
- GET description
- PUT description
- DELETE description

### Content type

- application JSON

### Response status

- 200 description
- 201 description
- 400 description
- 404 description
- 409 (conflict)
- 500 description



## Endpoints

## Grab a brew

```
GET/ beers/{id}
```

**Example**

```
GET /beers/beer-pabst-blue-ribbon
```

200 response

```
{
  "_id": "beer-pabst-blue-ribbon",
  "_rev": "2-540052b9c70863c2f0c90cf9e534d7f6",
  "name": "Pabst Blue Ribbon",
  "type": "beer",
  "style": "lager",
  "calories": 110,
  "container": "can",
  "brewer": "brewer-pabst-brewing-company",
  "stars": 2
}
```

## Update a beer

```
PUT /beers/{id}
```
**Example**

```
PUT /beers/beer-pabst-blue-ribbon

{
  "_id": "beer-pabst-blue-ribbon",
  "_rev": "2-540052b9c70863c2f0c90cf9e534d7f6",
  "name": "Pabst Blue Ribbon",
  "type": "beer",
  "style": "lager",
  "calories": 120,
  "container": "can",
  "brewer": "brewer-pabst-brewing-company",
  "stars": 2
}
```

200 response

```
{
"ok": true,
"id": "beer-pabst-blue-ribbon",
"rev": "3-540052b9c70863c2f0c90cf9e534d7f6"
}
```
