const { urlencoded } = require('express');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  endpointString: String,
  timestamp: Number,
  contents: {
    method: String,
    path: Object,
    headers: Object,
    query: Object,
    body: Object,
}}, {
  toJSON: {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
