App.factory('AuthService', ['$rootScope','$http', '$q', function($rootScope,$http, $q){

	var factory = {
			loginUser: loginUser,
			setCredentials : setCredentials,
			clearCredentials : clearCredentials,

	};

	return factory;

	
	
	function loginUser(user) {
		
		var deferred = $q.defer();
		
		$http.post('/verifyUser', user) //Call goes to server.js file method
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

	
	 function setCredentials(username) {
         $rootScope.globals = {
             currentUser: {
                 username: username,
             }
         };
     }
	
	
	 function clearCredentials() {
         $rootScope.globals = {};
	 }
}]);