App.factory('AutocompleteService', ['$rootScope','$http', '$q', function($rootScope,$http, $q){

	var factory = {
			getCodes: getCodes,
	};

	return factory;

	
	
	function getCodes(term) {
		var data = {
				"term": term
		};
		var deferred = $q.defer();
		
		$http.post('/autocomplete', data) //Call goes to server.js file method
		.then(
				function (response) {
					console.log(response);
	                // promise is fulfilled
					deferred.resolve(response.data);

				},
				function(errResponse){
					console.log('Error while validating the credentials');
	                // the following line rejects the promise 
					deferred.reject(errResponse);
				}
		);
        // promise is returned
		return deferred.promise;
	}
}]);