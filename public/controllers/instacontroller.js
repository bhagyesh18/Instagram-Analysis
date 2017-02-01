
var myApp = angular.module('myApp', []);
myApp.controller('AppInstaCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var TOKEN=localStorage.getItem("instaToken");;

var refresh = function() {
  $http.get('/users').success(function(response) {
    console.log("I got the data I requested");

    TOKEN=localStorage.getItem("instaToken");
    
    console.log(TOKEN);
    $scope.users = response;
    $scope.effect="hovereffect";
    $scope.user = "";
  });
};


var instagram = function() {
  
$http.jsonp("https://api.instagram.com/v1/users/self/?access_token="+TOKEN+"&format=json&callback=JSON_CALLBACK&Access-Control-Allow-Origin")
  .success(function(response) {

    console.log(TOKEN);
    $scope.username=response.data.username;
    $scope.fullname=response.data.full_name;
    $scope.profile=response.data.profile_picture;

    $scope.bio=response.data.bio;
    $scope.website=response.data.website;
    $scope.media=response.data.counts.media;
    $scope.follows=response.data.counts.follows;
    $scope.followedby=response.data.counts.followed_by;
  });
};

var recentmedia = function() {
  
$http.jsonp("https://api.instagram.com/v1/users/self/media/recent/?access_token="+TOKEN+"&format=json&callback=JSON_CALLBACK&Access-Control-Allow-Origin")
  .success(function(response) {
    
    console.log(TOKEN);
    $scope.recentmedialist=response.data;
   });
};

 $scope.effectFunction1 = function() {
        $scope.effect="hovereffect";
 }
 $scope.effectFunction2 = function() {
        $scope.effect="hovereffect1";
 }

var followers = function() {
  
$http.jsonp("https://api.instagram.com/v1/users/self/followed-by?access_token="+TOKEN+"&format=json&callback=JSON_CALLBACK&Access-Control-Allow-Origin")
  .success(function(response) {
    $scope.followerslist=response.data;

   });
};

 
instagram();
recentmedia();
followers();
refresh();

$scope.addUser = function() {
  console.log($scope.user);
  $http.post('/users', $scope.user).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/users/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/users/' + id).success(function(response) {
    $scope.user = response;
  });
};  

$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/users/' + $scope.user._id, $scope.user).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.user = "";
}

}]);﻿