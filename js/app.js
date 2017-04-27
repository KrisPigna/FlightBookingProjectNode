'use strict';

var App = angular.module('myApp', ['ngRoute']);

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



