angular.module('refugeeapp.controllers.infos', [])

.controller('InfosCtrl', function($scope,
		$translate,
		Infos,
		$location,
	    $localstorage
		) {

  $scope.openProfile = function(){
  	console.log("DEBUG-INFOS: TODO implement profile and settings")
  }
  
  Infos.setLanguageKey( $translate.use() );
  $scope.items = Infos.all();
  
  $scope.filterLocationAndRouting = function(element) {
    return 'location'.indexOf(element.tags) >=0; // element.location == true;
  };
  $scope.filterLanguage = function(element) {
    return   'language'.indexOf(element.tags) >=0;
  };
  $scope.filterMedi = function(element) {
    return   'medi'.indexOf(element.tags) >=0;
  };
  
 
  // we got the broadcast notification, that the background data has changed
  // e.g. the language was switched
  $scope.$on("updateTheData", function() {
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


})

.controller('InfoDetailCtrl', function($scope, $stateParams, Infos, $translate, $ionicHistory) {
  Infos.setLanguageKey( $translate.use() );
  console.log("DEBUG InfoDetailCtrl: All Infos = ",Infos.all() );
  console.log("DEBUG InfoDetailCtrl: currentItem: ",$stateParams.infoId );
  
  $scope.item = Infos.get($stateParams.infoId);
  
  $scope.$on('$ionicView.enter', function(e) {
  	Infos.setLanguageKey($translate.use());
	$scope.item = Infos.get($stateParams.infoId);	
  });
  
  $scope.goBack = function() {
	  console.log("INFO InfosDetailCtrl: go Back to")
	  console.log("     history="+JSON.stringify($ionicHistory.viewHistory(), null, 4) );
      $ionicHistory.goBack();
    };
  
})


;
