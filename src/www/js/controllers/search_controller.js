angular.module('refugeeapp.controllers.search_controller', [])

.controller('SearchCtrl', function(
		$scope, 
		$stateParams, 
		$translate,
		Infos,
		$rootScope) {
	console.log("DEBUG Search controlller");
	
    "use strict";

    $scope.term = '';
    $scope.hits = [];
    $scope.showResults = false;
	
	$scope.server_image_url = $rootScope.CONFIG.apiUrl +"/thumbs/"
	
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