var bodyParser = require('body-parser');
var Booking = require('../models/booking');
var config = require('../../config');
var protectRoutes = require('../middleware/protectRoutes');

module.exports = function(app, express){
  var router = express.Router();

  router.use(protectRoutes);

  router.get('/', function(req, res){
    res.json({ message: 'Welcome to our API!'});
  });

  router.route('/bookings')

    .post(function(req, res) {
      var booking = new Booking();
      booking.name = req.body.name;
      booking.arrival = req.body.arrival;
      booking.size = req.body.size;
      booking.notes = req.body.notes;
      booking.cell = req.body.cell;

      booking.save(function(err) {
        if(err)
          res.send(err);

        res.json({ message: 'Booking created!'});
      });
    })

    .get(function(req, res){
      Booking.find(function(err, bookings){
        if(err) res.send(err);

        res.json(bookings);
      });
    });

  router.route('/bookings/:booking_id')

    .get(function(req, res){
      Booking.findById(req.params.booking_id, function(err, booking){
        if(err) res.send(err);

        res.json(booking);
      });
    })

    .put(function(req, res){
      Booking.findById(req.params.booking_id, function(err, booking){
        if(err) res.send(err);

        //if field contains data or user deleted the data from a field, update
        if(req.body.name || booking.name) booking.name = req.body.name;
        if(req.body.arrival) booking.arrival = req.body.arrival;
        if(req.body.size || booking.size) booking.size = req.body.size;
        if(req.body.notes || booking.notes) booking.notes = req.body.notes;
        if(req.body.cell || booking.cell) booking.cell = req.body.cell;

        booking.save(function(err) {
          if(err) res.send(err);

          res.json({ messaage: 'User updated!'});
        });
      });
    })

    .delete(function(req, res){
      Booking.remove({
        _id: req.params.booking_id
      }, function(err, booking){
        if(err) res.send(err);

        res.json({ message: 'Successfully deleted'});
      });
    });

  router.get('/me', function(req, res){
    res.send(req.decoded);
  });
  return router;
};
