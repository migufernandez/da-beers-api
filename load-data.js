require('dotenv').config()
const Pouchdb = require('pouchdb')
const db = new Pouchdb(process.env.COUCH_URL + process.env.COUCH_DB)

const beers = [
  {
    _id: 'beer-lagunitas-little-sumptin-sumptin',
    name: 'lagunitas little sumptin sumptin',
    type: 'beer',
    style: 'ale',
    calories: 150,
    container: 'bottle',
    brewer: 'brewer-lagunitas',
    stars: 4
  },
  {
    _id: 'beer-lagunitas-little-brown-sugar',
    name: 'lagunitas little brown sugar',
    type: 'beer',
    style: 'ale',
    calories: 150,
    container: 'bottle',
    brewer: 'brewer-lagunitas',
    stars: 5
  }
]

db
  .bulkDocs(beers)
  .then(function(result) {
    // handle succesful future promised result
    console.log('SUCCESS!', result)
  })
  .catch(function(err) {
    // handle posible problem future promised result
    console.log(err)
  })

console.log('Am I 1st?')
