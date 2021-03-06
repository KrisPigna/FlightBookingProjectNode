App.service('FlightService', ['$http', function($http){
    
    this.flights = [];
    this.results = [];
    
    this.newFlight = function(departureCity, arrivalCity, departureDate, arrivalDate, duration, flightNumber, price, leg){
        this.flight = {departureCity: departureCity, arrivalCity: arrivalCity, departureDate: departureDate, arrivalDate: arrivalDate, duration: duration, flightNumber: flightNumber, price: price, legs: leg};
        return this.flight;
    }
    
    this.populateFlightsList = function(successResponse) {
        if (successResponse) {
            this.results = successResponse;
            var origin;
            var destination;
            var departDate;
            var arriveDate;
            var duration;
            var flightNumber;
            var airline;
            var price;
            for (var i = 0; i < this.results["trips"]["tripOption"].length; i++) {
            	var flight = [];
            	for (var j = 0; j < this.results["trips"]["tripOption"][i]["slice"][0]["segment"].length; j++) {
            		console.log(i);
	                origin = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["origin"];
	                destination = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["destination"];
	                departDate = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["departureTime"].substring(11,16);
	                arriveDate = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["leg"][0]["arrivalTime"].substring(11,16);
	                duration = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["duration"];
	                flightNumber = this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["flight"]["carrier"];
	                flightNumber = flightNumber + this.results["trips"]["tripOption"][i]["slice"][0]["segment"][j]["flight"]["number"];
	                price = this.results["trips"]["tripOption"][i]["saleTotal"];
	                if (j > 0) {
	                	console.log(j);
	                	this.flights[i].legs.push(this.newFlight(origin, destination, departDate, arriveDate, duration, flightNumber, price, null));
	                } else {
	                	this.flights.push(this.newFlight(origin, destination, departDate, arriveDate, duration, flightNumber, price, flight));
	                }
            	}
            }
        } else {
            this.results = [];
        }
        console.log(this.flights)
        return this.flights;
    }
    
    /*this.getFlightResultsTESTING = function() {
    	return $http.get("/json/exampleresponse.json") 
            .then(function(response){console.log(response.data);return response.data}, function(){console.log(response)});
    }*/
    
    this.getFlightResults = function(formData) {
        if (formData.class == "Coach") {
            formData.class = "COACH";
        } else if (formData.class == "Premium Coach") {
            formData.class = "PREMIUM_COACH";
        } else if (formData.class == "Business") {
            formData.class = "BUSINESS";
        } else {
            formData.class = "FIRST";
        }
        if (formData.refundable == "Yes") {
            formData.refundable = true;
        } else {
            formData.refundable = false;
        }
        console.log('"' + formData.departureCity + '"' + " " + '"' + formData.arrivalCity + '"' + " " + '"' + formData.departureDate + '"' + " " + formData.numberAdults + " " + formData.numberChildren + " " + '"' + formData.class + '"');
            return $http({
                method: "POST",
                url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBAYG_5X7FRSYs7NM1-VfmXV-U_ne4m5J4",
                 headers: {
                    'Content-type': 'application/json'
                },
                data:
                        {
                          "request": {
                            "passengers": {
                              "kind": "qpxexpress#passengerCounts",
                              "adultCount": formData.numberAdults,
                              "childCount": formData.numberChildren,
                              "infantInLapCount": 0,
                              "infantInSeatCount": 0,
                              "seniorCount": 0
                            },
                            "slice": [
                              {
                                "kind": "qpxexpress#sliceInput",
                                "origin": formData.departureCity,
                                "destination": formData.arrivalCity,
                                "date": formData.departureDate,
                                "maxStops": formData.stops
                              }
                            ],
                            "saleCountry": "US",
                            "ticketingCountry": "US",
                            "refundable": formData.refundable,
                            "solutions": 20
                          }
                        }
            
            }) 
                .then(function(response){console.log(response.data);return response.data}, function(){console.log(response)});
         }
}]);