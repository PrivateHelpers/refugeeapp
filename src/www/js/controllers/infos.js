angular.module('refugeeapp.controllers.infos', [])

.controller('InfosCtrl', function($scope,
		$translate,
		Infos,
		$location
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
  
  // on startup we set the data:
  // Items.setLanguageKey( $translate.use() );
  
  
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
  	console.log("INFO: we could also update data in the enter event...")
  });


  $scope.navigateTo = function ( path ) {
	  console.log("we navigate to url: "+ path)
      $location.path( path );
    };

})

.controller('InfoDetailCtrl', function($scope, $stateParams, Infos, $translate) {
  Infos.setLanguageKey( $translate.use() );
  console.log("DEBUG InfoDetailCtrl: All Infos = ",Infos.all() );
  console.log("DEBUG InfoDetailCtrl: currentItem: ",$stateParams.infoId );
  
  $scope.item = Infos.get($stateParams.infoId);
  
  $scope.$on('$ionicView.enter', function(e) {
  	Infos.setLanguageKey($translate.use());
	$scope.item = Infos.get($stateParams.infoId);	
  });
  
})


;
