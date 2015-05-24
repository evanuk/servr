angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
    //home page
    .when('/', {
      templateUrl: 'app/views/pages/home.html'
    })

    .when('/login', {
      templateUrl   : 'app/views/pages/login.html',
        controller  : 'mainController',
        controllerAs: 'login'
    })

    .when('/bookings', {
      templateUrl: 'app/views/pages/bookings/all.html',
      controller: 'bookingController',
      controllerAs: 'booking'
    })

    .when('/bookings/create',{
      templateUrl: 'app/views/pages/bookings/single.html',
      controller: 'bookingCreateController',
      controllerAs: 'booking'
    })

    .when('/bookings/edit/:booking_id', {
      templateUrl: 'app/views/pages/bookings/single.html',
      controller: 'bookingEditController',
      controllerAs: 'booking'
    });

  //get rid of the hash in the URL
  $locationProvider.html5Mode(true);
});
