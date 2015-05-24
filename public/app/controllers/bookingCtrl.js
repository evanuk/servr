//start our controller and inject bookingService
angular.module('bookingCtrl', ['bookingService'])

//booking controller for the main page
//inject the booking factory
.controller('bookingController', function(Booking){

  var vm = this;

  //set a processing variable to show loading things
  vm.processing = true;


  //grab all the bookings at page load
  Booking.all()
    .success(function(data){

      //when all the bookings come back, remove the processing variable
      vm.processing = false;

      //bind the bookings that come back to vm.booking
      vm.bookings = data;
    });

  vm.deleteBooking = function(id){
    vm.processing = true;
    //accepts the booking id as a parameter
    Booking.delete(id)
      .success(function(data){
          //get all bookings to update the table
          //might want to get api to return list of bookings with delete
          Booking.all()
            .success(function(data){
              vm.processing = false;
              vm.bookings = data;
            });
      });
  };
})

//controller for the booking creation page
.controller('bookingCreateController', function(Booking, $location){

  var vm = this;

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  vm.type='create';

  //function to create a booking
  vm.saveBooking = function(){
    vm.processing = true;

    //clear the message
    vm.message = '';

    vm.bookingData.arrival = new Date();

    //use the create function in the bookingService
    Booking.create(vm.bookingData)
      .success(function(data){
        vm.processing = false;

        //clear the form
        //vm.bookingData = {};
        //vm.message = data.message;
        $location.path('/bookings');
      });
  };
})

.controller('bookingEditController', function($routeParams, Booking, $location){

  var vm = this;

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  vm.type = 'edit';

  //get the booking data for the booking you want to edit
  //$routeParams is the wy we grab data from the URL
  Booking.get($routeParams.booking_id)
    .success(function(data){
      vm.bookingData = data;
    });

  //function to save the booking
  vm.saveBooking = function(){
    vm.processing = true;
    vm.message = '';
    //call the bookingService function to update
    Booking.update($routeParams.booking_id, vm.bookingData)
      .success(function(data){
        vm.processing = false;
        //clear the form
        //vm.bookingData = {};

        //bind the message from our API to vm.message
        //vm.message = data.message

        $location.path('/bookings');
      });
  };

});
