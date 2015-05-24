angular.module('userService', [])

.factory('User', function($http){

  //get a single User
  userFactory.get = function(id){
    return $http.get('/api/users/' + id);
  };

  //get all users
  userFactory.all = function(){
    return $http.get('/api/users');
  };

  //create a User
  userFactory.create = function(userData){
    return $http.post('/api/users/', userData);
  };

  //update a user
  userFactory.update = function(id, userData){
    return $http.put('/api/users/' + id, userData);
  };

  //delete a user
  userFactory.delete = function(id){
    return $http.delete('/api/users/' + id);
  }

  //return our entire userFactor object
  return userFactory;
});
