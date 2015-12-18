angular.module('refugeeapp.controllers', [])

.controller('FavoritesCtrl', function($scope,
	$translate,  //inject the $translate service
	Items,		// we might switch the language for The Items
	$rootScope,
	Favorites,
	Infos
	) {

	// init data when using this controller 
	Favorites.setLanguageKey( $translate.use() );
	Infos.setLanguageKey($translate.use());
	$scope.items = Favorites.all(Infos);
	
	// if we enter the view, we will update the data
	// (because language might have changed)
    $scope.$on('$ionicView.enter', function(e) {
    	Favorites.setLanguageKey($translate.use());
		Infos.setLanguageKey($translate.use());
  		$scope.items = Favorites.all(Infos);
    });
	
	// some custom filters used on the view:
	$scope.filterTopFavorites = function(element) {
	  return element.top == true;
	};
	$scope.filterLastWeek = function(element) {
	  return element.lastWeek == true && element.top == false;
	};

	
})

.controller('FavoriteDetailCtrl', function($scope, $stateParams, Favorites, $translate, Infos) {
    console.log("DEBUG FavoriteDetailCtrl: All Items = ",Favorites.all(Infos) );
    console.log("DEBUG FavoriteDetailCtrl: currentItem: ",$stateParams.favoriteId );
  
    //$scope.item = Favorites.get($stateParams.favoriteId);
  
    $scope.$on('$ionicView.enter', function(e) {
    	Favorites.setLanguageKey($translate.use());
  		//$scope.item = Favorites.get($stateParams.favoriteId);	
		var currFav = Favorites.get($stateParams.favoriteId);	
		console.log("DEBUG FavoriteDetailCtrl: currFavId=" + currFav.itemId)
		Infos.setLanguageKey($translate.use());
		$scope.item = Infos.get(currFav.itemId)
    });
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
	
	$scope.refreshData = function(){
		console.log("TODO: refresh the data")
	}
	
	// we got the broadcast notification, that the background data has changed
	// e.g. the language was switched
	// $scope.$on("updateTheData", function() {
	//     // signal that data changed, lazy load when the tab is actually clicked
	// 	console.log("GOT-NOTIFIED: DATA CHANGED")
	//     $scope.items = Items.all();
	// });

    $scope.$on('$ionicView.enter', function(e) {
    	Items.setLanguageKey($translate.use());
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


.controller('AboutCtrl', function($translate) {
	console.log("About-Controller: ...")
})
.controller('FeedbackCtrl', function($translate) {
	console.log("Feedback-Controller: ...")
})
;
