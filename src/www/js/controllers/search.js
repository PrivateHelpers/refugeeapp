angular.module('refugeeapp.controllers.search', [])

.controller('SearchCtrl', function(
		$scope, 
		$stateParams, 
		$translate,
		Infos) {
	console.log("DEBUG Search controlller");
	
    "use strict";

    $scope.term = '';
    $scope.hits = [];
    $scope.showResults = false;

    $scope.searchTerm = function () {
		$scope.hits = Infos.searchFulltext(this.term) || [];
		console.log('hits received: '+$scope.hits.length);
        $scope.showResults = true;
    };

    $scope.seachNow = function () {
		console.log(" We Search for term "+this.term+"...")
	   $scope.hits = Infos.searchFulltext(this.term) || [];
    };


    $scope.$on('$ionicView.enter', function(e) {
    	Infos.setLanguageKey($translate.use());
    });
	

})



;