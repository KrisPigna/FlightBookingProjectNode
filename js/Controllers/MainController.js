'use strict';
App.controller('MainController',['$rootScope','$window', '$scope', 'FlightService','SharedData',  function($rootScope,$window, $scope, FlightService, SharedData) {
   
   //12.We are using the currentUser globals value, stored in authservice, when user is succesfully logged in.
   //we use this to shuffle between login and logout.
   $scope.loginbutton = true;
   $scope.logoutbutton = false;

   console.log( $scope.loginbutton);
   if($rootScope.globals === undefined) {
	   $scope.loginbutton = true;
	   $scope.logoutbutton = false;
   } else {
	   var uname = $rootScope.globals.currentUser;
	   $scope.loginbutton = false;
	   $scope.logoutbutton = true;
   }
   
   
   $scope.search = function() {
	   SharedData.setForm($scope.form);
       /*FlightService.getFlightResults($scope.form).then(function(successResponse){
	   //FlightService.populateFlightsListTESTING($scope.form).then(function(successResponse){
		   $scope.flights = FlightService.populateFlightsList(successResponse);
		   console.log($scope.flights);
           SharedData.setFlights($scope.flights);
           console.log($scope.flights);
	   })*/
      };
}]);