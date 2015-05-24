var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
  name: { type: String, required: true },
  arrival: { type:Date, required: true},
  size: {type: Number, required: true},
  notes: String,
  cell: String
})

module.exports = mongoose.model('Booking', BookingSchema);
