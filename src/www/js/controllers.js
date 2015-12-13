angular.module('refugeeapp.controllers', [])

.controller('FavoritesCtrl', function($scope,
	$translate,  //inject the $translate service
	Items,		// we might switch the language for The Items
	$rootScope,
	Favorites
	) {
	
    $scope.settings = {
  	  enableFriends: true,
      showDebug: true,
      langs:  [ {name:"English", id:"en"},
				{name:"Deutsch", id:"de"} ],
      lang:   {} 
    };

	Favorites.setLanguageKey( $translate.use() );
	$scope.items = Favorites.all();
	
	// default for the dropdown to en or de <= see defaults for translate 
	console.log("D-E-B-U-G: tanslate.use = "+ $translate.use() )
	if ( $translate.use() == "en" ){
		$scope.settings.lang = $scope.settings.langs[0] // en
	}else{
		$scope.settings.lang = $scope.settings.langs[1] // de
	};
	
	$scope.switchLanguage = function(key) {	  
	  console.log(" DEBUG-INFOS: we switch the GUI to lang-key='"+key+"'")
  	  $translate.use(key);

	  console.log(" DEBUG-INFOS: we set lang-key'"+key+"' for items")
	  Items.setLanguageKey(key);
	  Favorites.setLanguageKey(key);

	  // Tell GoodsController and InfosController to update!
  	  console.log("TRIGGER EVENT: DATA CHANGED");
  	  $rootScope.$broadcast("updateTheData"); 
	  $scope.items = Favorites.all();
	};
	$scope.$watch('settings.lang', function() {
	  console.log('DEBUG-Dropdown: The lang has changed to '+$scope.settings.lang.id);
	  $scope.switchLanguage($scope.settings.lang.id)	 
	});
	
	$scope.filterTopFavorites = function(element) {
	  return element.top == true;
	};
	$scope.filterLastWeek = function(element) {
	  return element.lastWeek == true && element.top == false;
	};
	
})

.controller('FavoriteDetailCtrl', function($scope, $stateParams) {

 })



.controller('GoodsCtrl', function($scope, Items, $translate) {
	
	// we set the language to specify which data set we like to have
	Items.setLanguageKey( $translate.use() );
	
	// initialise the (current used) data:
    $scope.items = Items.all();
	
    $scope.remove = function(item) {
      Items.remove(item);
    };
	$scope.filterOtherOffers = function(element) {
	  return element.my == false;
	};
	$scope.filterMyOffers = function(element) {
	  return element.my == true;
	};
	
	// we got the broadcast notification, that the background data has changed
	// e.g. the language was switched
	$scope.$on("updateTheData", function() {
	    // signal that data changed, lazy load when the tab is actually clicked
		console.log("GOT-NOTIFIED: DATA CHANGED")
	    $scope.items = Items.all();
	});

})

.controller('GoodDetailCtrl', function($scope, $stateParams, Items, $translate) {
  console.log("DEBUG GoodDetailCtrl: All Items = ",Items.all() );
  console.log("DEBUG GoodDetailCtrl: currentItem: ",$stateParams.itemId );
  
  $scope.item = Items.get($stateParams.itemId);
  
  $scope.$on('$ionicView.enter', function(e) {
  	Items.setLanguageKey($translate.use());
	$scope.item = Items.get($stateParams.itemId);	
  });
  
})

;
