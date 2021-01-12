const mongoose = require('mongoose');

// our data schema **might not be necessary?**
const GeodataSchema = new mongoose.Schema({
  type: {
    type: String
  },
  properties: {
    type: Object
  },
  geometry: {
    type: Object
  }
}, { collection : 'geo' }); //specify database we retrieving from

//export
module.exports = mongoose.model('Geodata', GeodataSchema);
