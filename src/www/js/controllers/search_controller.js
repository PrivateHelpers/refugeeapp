angular.module('refugeeapp.controllers.search_controller', [])

.controller('SearchCtrl', function(
		$scope, 
		$stateParams, 
		$translate,
		Infos,
		$rootScope,
		$localstorage
		) {
	console.log("DEBUG Search controlller");
	
    "use strict";

    $scope.term = '';
    $scope.hits = [];
    $scope.showResults = false;
	
	
 	// on startup we check for already (previously downloaded infos in local cache)
	var cachedMessage = $localstorage.getObject('InfoMessagesCache')
	if (Object.keys(cachedMessage).length > 0) {
    	// path to images on the server:
		// replaces the local path (for the cached images coming with the app)
    	$scope.server_image_url = $rootScope.CONFIG.apiUrl +"/thumbs/"
	}else{
		// TODO: check, why this does not work at the moment:
	    // local cached path to images:
	  	$scope.server_image_url = "/img/info/"
	} 

	
	
	 
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

	 	// on enter we check  AGAIN <= TODO is this necessary ??
		// for already (previously downloaded infos in local cache)
		var cachedMessage = $localstorage.getObject('InfoMessagesCache')
		if (Object.keys(cachedMessage).length > 0) {
	    	// path to images on the server:
			// replaces the local path (for the cached images coming with the app)
	    	$scope.server_image_url = $rootScope.CONFIG.apiUrl +"/thumbs/"
		}else{
		    // TODO: check, why this does not work at the moment:
			// local cached path to images:
		  	$scope.server_image_url = "/img/info/"
		} 


    });
	

})



;