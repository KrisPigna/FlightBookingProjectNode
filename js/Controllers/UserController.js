angular.module('myApp').controller('BooksController', ['$scope','$element','BookService', function($scope, $element, BookService) {
	var self = this;
	self.book={bookid:null,bookName:"",authorName:'',isbnCode:'',numBooks:'',publishDate:'',bookCategory:'',numBooksIssued:''};
	self.books = [];
	self.submit = submit;
	self.edit = edit;
	self.remove = remove;
	$scope.myform = {};
	$scope.IsVisible = false;
	$scope.isButtonDivVisible = true;
	$scope.isButtonTranVisible = false;
	$scope.isUpdateError = false;
	$scope.isDeletedDisplay = false;
	$scope.isIssueDisplay = false;

	
	//self.reset = reset;

	$scope.loader = {
			loading: false
	};

	fetchAllBooks();

	function fetchUser(){
		BookService.fetchUser()
		.then(
				function(data) {
					if(data.error==0) {
						self.books = data.books;
					} else {
						self.books = [];
					}

				},
				function(errResponse){
					console.error('Error while fetching Books');
				}
		);
	}
}]);