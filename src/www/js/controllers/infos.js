angular.module('refugeeapp.controllers.infos', [])

.controller('InfosCtrl', function($scope,
		$translate,
		Infos,
		$location,
	    $localstorage,
		resolvedInfos // set up in app.js for state "tab.infos"
		) {

  $scope.lastUpdateTimestamp="Last-Update: Pull to refresh"
  
  $scope.openProfile = function(){
  	console.log("DEBUG-INFOS: TODO implement profile and settings")
  }
  
  // resolved before setting up the view:
  //  find resolve in app.js state "tab.infos"
  $scope.items = resolvedInfos;
  
  
  $scope.filterLocationAndRouting = function(element) {
	return element.category == "location"
    //return  'location'.indexOf(element.tags) >=0; // element.location == true;
  };
  $scope.filterLanguage = function(element) {
	return element.category == "language"
    //return   'language'.indexOf(element.tags) >=0;
  };
  $scope.filterMedi = function(element) {
	return element.category == "medi"
    //return   'medi'.indexOf(element.tags) >=0;
  };
  $scope.filterCulture = function(element) {
	return element.category == "culture"
    //return   'culture'.indexOf(element.tags) >=0;
  };
  $scope.filterOthers = function(element) {
    return 	element.category != "location" &&
	  		element.category != "language" &&
	  		element.category != "culture" &&
	  		element.category != "medi"
    // return  'medi'.indexOf(element.tags) ==0 &&
    // 	  		'language'.indexOf(element.tags) ==0 &&
    // 	 	 	'location'.indexOf(element.tags) ==0 &&
    // 	 	 	'culture'.indexOf(element.tags) ==0
    // 	  		 ;
  };
 
  // we got the broadcast notification, that the background data has changed
  // e.g. the language was switched
  $scope.$on("updateTheData", function() {
	// TODO check if necessary, maybe we reload in resolve (see app.js for state tab.infos) 
    // signal that data changed, lazy load when the tab is actually clicked
	console.log("GOT-NOTIFIED: DATA CHANGED")
	Infos.setLanguageKey($translate.use());
    $scope.items = Infos.all();
  });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
  	console.log("INFO: we enter the infos view. So we check/set the language")
	// TODO check if necessary, maybe we reload in resolve (see app.js for state tab.infos) 
	Infos.setLanguageKey($translate.use());
	$scope.items = Infos.all();
  });
  $scope.$on('$ionicView.loaded', function(e){
  	console.log("INFO: the infos view is generated (ONCE). we check for language in the local storage...")
  	var lang = $localstorage.get('language')
  	if (lang){
  		console.log("LOCAL-STORAGE: LANG we should set the language to "+lang)
  		$translate.use(lang)
  	}
  });


  $scope.navigateTo = function ( path ) {
	  console.log("INFO: we navigate to url: "+ path)
      $location.path( path );
    };

	$scope.doRefresh = function(){
		console.log("TO-BE-IMPLEMENTED: refresh data (and update timestamp)")
		var d = new Date()
		$translate('ABOUT.LAST_UPDATE').then( function(luStr){
			$scope.lastUpdateTimestamp = luStr+" "+ d.toLocaleDateString() + " " + d.toTimeString().slice(0,5)
			$scope.$broadcast('scroll.refreshComplete');
			// changes (would not be necessary for $http.get with promise) 
			$scope.$apply() // we did changes to the scipe outside a digest cycle! 
		})
	}


})

.controller('InfoDetailCtrl', function(
	$scope, 
	$stateParams, 
	Infos, 
	$translate, 
	$ionicHistory,
	Favorites
	) {
  Infos.setLanguageKey( $translate.use() );
  console.log("DEBUG InfoDetailCtrl: All Infos = ",Infos.all() );
  console.log("DEBUG InfoDetailCtrl: currentItem: ",$stateParams.infoId );
  
  $scope.item = Infos.get($stateParams.infoId);
  
  $scope.top = false
  
  $scope.switchIsTopFavorite = function(){
	  if ( $scope.top ){
		$scope.top = false
	  	Favorites.removeWithInfoId( $stateParams.infoId )
	  }else{
		$scope.top = true
	  	Favorites.addWithInfoId( $stateParams.infoId , true)	
	  }
  }
  
  $scope.$on('$ionicView.enter', function(e) {
  	Infos.setLanguageKey($translate.use());
	$scope.item = Infos.get($stateParams.infoId);	
	$scope.top = Favorites.get($stateParams.infoId) && Favorites.get($stateParams.infoId).top
	
	// add to "Last-Search, Last-Viewed favorites"
	Favorites.currentlyViewedInfoId($stateParams.infoId)
  });
  
  $scope.goBack = function() {
	  console.log("INFO InfosDetailCtrl: go Back to")
	  console.log("     history="+JSON.stringify($ionicHistory.viewHistory(), null, 4) );
      $ionicHistory.goBack();
    };
  
})


;
