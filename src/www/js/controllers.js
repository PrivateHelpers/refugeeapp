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




.controller('AboutCtrl', function($translate) {
	console.log("About-Controller: ...")
})

;
