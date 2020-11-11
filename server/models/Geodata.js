const mongoose = require('mongoose');

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
}, { collection : 'data' });

module.exports = mongoose.model('Geodata', GeodataSchema);
