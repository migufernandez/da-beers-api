const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCH_URL + process.env.COUCH_DB)

const addBeer = beer => {
  const toBeerNameLower = beer.name.toLowerCase()
  const replacedSpacesWithDashes = toBeerNameLower.replace(' ', '_')
  const concatBeer = 'beer-' + replacedSpacesWithDashes
  beer._id = concatBeer
  beer.type = 'beer'

  return db.put(beer)
}

const getBeer = id => db.get(id)
const updateBeer = beer => db.put(beer) // returns a promise.
const deleteBeer = beerId => db.get(beerId).then(doc => db.remove(doc))

module.exports = {
  getBeer,
  addBeer,
  updateBeer,
  deleteBeer
}
