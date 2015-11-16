// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'firebase'])
 
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('chatController', ["$scope", "chatMessages", function($scope, chatMessages ) {
    //Set messages to chatMessages factory which returns the firebase data
    $scope.messages = chatMessages;
    
    //Initialize message object
    $scope.message = {};
 
    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])
.factory("chatMessages", ['$firebase', "$rootScope", function($firebase, $rootScope){
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("http://httplambdachatapp.firebaseio.com");
 
     // this uses AngularFire to create the synchronized array
     return $firebase(ref.limitToLast(10)).$asArray();
}]);