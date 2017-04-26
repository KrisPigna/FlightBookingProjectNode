'use strict';

var App = angular.module('myApp', ['ngRoute']);

App.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
			  $(element).datepicker({
				  dateFormat: 'yy-mm-dd',
				  onSelect: function (date) {
					  	if(this.attributes['ng-model'].value == "form.departureDate") {
					  		console.log(this.attributes['ng-model'].value);
					  		ngModelCtrl.$setViewValue(date);
					  	}
					  	if(this.attributes['ng-model'].value == "form.returnDate") {
					  		console.log(this.attributes['ng-model'].value);
					  		ngModelCtrl.$setViewValue(date);
					  	}
	                    scope.$apply();
	                }
			  });
         }
    }
});

App.directive('autoComplete', function () {
        return function postLink(scope, iElement, iAttrs) {

            var availableTags = [
                    "ActionScript",
                    "AppleScript",
                    "Asp",
                    "BASIC",
                    "C",
                    "C++",
                    "Clojure",
                    "COBOL",
                    "ColdFusion",
                    "Erlang",
                    "Fortran",
                    "Groovy",
                    "Haskell",
                    "Java",
                    "JavaScript",
                    "Lisp",
                    "Perl",
                    "PHP",
                    "Python",
                    "Ruby",
                    "Scala",
                    "Scheme"
                ];
                $( iElement ).autocomplete({
                    source: availableTags
                });
        }
});

/*Routeprovider is used to route the request to the it's own template url i.e. custom html and it's controller
 * class.
 * 
 * 
 * */
App.config(['$routeProvider', function ($routeProvider) { 
$routeProvider
    .when("/", {
        templateUrl : "views/search.html",
        controller : "MainController"
    })
    .when("/results", {
        templateUrl : "results.html",
        controller : "ResultsController"
    })
      .when("/login", {
        templateUrl : "views/login.html",
        controller : "LoginController"
    })
      .when("/register", {
        templateUrl : "views/register.html",
        controller : "RegisterController"
    })
    
    .otherwise({
        redirectTo: "/"
   });

}]);



