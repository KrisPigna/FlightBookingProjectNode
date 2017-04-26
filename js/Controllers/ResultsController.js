App.controller('ResultsController', function($scope, FlightService, SharedData) {
    //$scope.flightsDB = FlightService.populateFlightsList();
    //SharedData.setFlights($scope.flightsDB);
	 FlightService.getFlightResults(SharedData.getForm()).then(function(successResponse){
		   //FlightService.populateFlightsListTESTING($scope.form).then(function(successResponse){
			   $scope.flights = FlightService.populateFlightsList(successResponse);
			   console.log($scope.flights);
	           SharedData.setFlights($scope.flights);
	           console.log($scope.flights);
		   })
    console.log($scope.flights);
});