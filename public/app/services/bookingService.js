angular.module('bookingService', [])

.factory('Booking', function($http){
  var bookingFactory = {};

  bookingFactory.get = function(id){
    return $http.get('/api/bookings/' + id);
  };

  bookingFactory.all = function(){
    console.log("running");
    return $http.get('/api/bookings/');
  };

  bookingFactory.create = function(userData){
    return $http.post('/api/bookings/', userData);
  };

  bookingFactory.update = function(id, userData){
    return $http.put('/api/bookings/' + id, userData);
  };

  bookingFactory.delete = function(id){
    return $http.delete('/api/bookings/' + id);
  };

  return bookingFactory;

});
