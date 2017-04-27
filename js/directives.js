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

App.directive('autoComplete', function ($http, AutocompleteService) {
        return function postLink(scope, iElement, iAttrs) {
                $( iElement ).autocomplete({
                    source: function(req,res) {
                    		console.log(AutocompleteService.getCodes(req.term).then(function(successResponse){
                    			return successResponse;
                    		}));
                    	},
                    minLength: 3
                });
        }
});