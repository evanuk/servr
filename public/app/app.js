angular.module('bookingApp', [
  'mainCtrl',
  'ngAnimate',
  'appRoutes',
  'authService',
  'bookingService',
  'bookingCtrl',
  'userService',
  'ngRoute'
])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});
