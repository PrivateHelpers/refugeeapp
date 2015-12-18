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
        $scope.hits = Infos.searchByTag(this.term) || [];
		console.log('hits received: '+$scope.hits.length);
        $scope.showResults = true;
    };

	// // not used anymore
	//     $scope.resetResults = function () {
	//         $scope.showResults = false;
	//         $scope.hits = [];
	//     };

    $scope.seachNow = function () {
		console.log("search please for term "+this.term+"...")
       $scope.hits = Infos.searchByTag(this.term) || [];
    };


    $scope.$on('$ionicView.enter', function(e) {
    	Infos.setLanguageKey($translate.use());
    });
	

})



;