require('dotenv').config()

const express = require('express')
const app = express()
const NodeHTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { path, prop, isEmpty, join } = require('ramda')
const { getBeer, updateBeer, addBeer, deleteBeer } = require('./dal')
const bodyParser = require('body-parser')
const checkRequiredFields = require('./lib/check-required-fields')

app.use(bodyParser.json())

app.get('/', (req, res, next) =>
  res.status(200).send({ message: 'Welcome, DAA Beers!' })
)

app.post('/beers', (req, res, next) => {
  // the request body is located at req.body or prop('body', req)
  // check required Fields but dont check id, type, rev.
  // if all ok addBeer(prop('body', req))

  const checkResults = checkRequiredFields(
    ['name', 'style', 'calories', 'brewer'],
    prop('body', req)
  )

  if (isEmpty(checkResults)) {
    addBeer(prop('body', req))
      .then(response => res.status(201).send(response))
      .catch(err => next(new NodeHTTPError(err.status, err.message)))
  } else {
    return next(
      new NodeHTTPError(
        400,
        `Missing Required Fields in Request Body: ${join(' ', checkResults)}`
      )
    )
  }
})

app.get('/beers/:id', (req, res, next) => {
  const beerID = path(['params', 'id'], req) // req.params.id
  getBeer(beerID)
    .then(beer => res.status(200).send(beer))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

app.put('/beers/:id', (req, res, next) => {
  if (req.params.id === req.body._id) {
    const checkResults = checkRequiredFields(
      ['_id', '_rev', 'name', 'type', 'style', 'calories', 'brewer'],
      prop('body', req)
    )
    console.log('checkResults', checkResults)
    if (isEmpty(checkResults)) {
      updateBeer(prop('body', req))
        .then(updateBeerResult => res.status(200).send(updateBeerResult))
        .catch(err => next(new NodeHTTPError(err.status, err.message)))
    } else {
      return next(
        new NodeHTTPError(
          400,
          `Missing Required Fields in Request Body: ${join(',', checkResults)}`
        )
      )
    }
  } else {
    return next(
      new NodeHTTPError(400, `beer id in path does not match _id in body.`)
    )
  }
})

app.delete('/beers/:id', (req, res, next) => {
  // req.params.id
  deleteBeer(path(['params', 'id'], req))
    .then(response => res.status(200).send(response))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

app.use((err, req, res, next) => {
  console.log('ERROR', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('DAA Beers! on port', port))
