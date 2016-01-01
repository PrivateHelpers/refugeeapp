angular.module('refugeeapp.controllers.favorites_controller', [])

.controller('FavoritesCtrl', function($scope,
	$translate,  //inject the $translate service
	Items,		// we might switch the language for The Items
	$rootScope,
	Favorites,
	Infos,
	$localstorage
	) {

		
	// init data when using this controller 
	Infos.setLanguageKey($translate.use());
	$scope.favorites = Favorites.all(Infos);
	
	// if we enter the view, we will update the data
	// (because language might have changed)
    $scope.$on('$ionicView.enter', function(e) {
		console.log("DEBUG Favorite- Ctrl enter ..." ) 
		Infos.setLanguageKey($translate.use());
  		$scope.favorites = Favorites.all(Infos);
    });
	
	// some custom filters used on the view:
	$scope.filterTopFavorites = function(element) {
	  return element.top == true;
	};
	$scope.filterLastWeek = function(element) {
	  var inlastWeek = (new Date() - element.timestamp < 7*24*60*60*1000) // in secs
	  return inlastWeek == true && element.top == false;
	};

	$scope.removeFromFavoritesList = function(fav){
		Favorites.remove(fav)
	}
	$scope.prettyTimestamp=function(date){
		var datevalues = {
		         y: date.getFullYear(),
		         m: date.getMonth()+1,
		         d: date.getDate(),
		         H: date.getHours(),
		         M: date.getMinutes()
		      };
		if (datevalues['M'] < 10) {	datevalues['M'] = "0"+datevalues['M']	}
	    var now = new Date()
		if (now.getFullYear() == date.getFullYear() // Today
			&& now.getMonth() == date.getMonth() 
			&& now.getDate() == date.getDate() ){
			  	return datevalues['H']+":"+datevalues['M']
		}else{
			  	return datevalues['d']+"."+datevalues['m']+". "+ datevalues['H']+":"+datevalues['M']
		}
		
	}
	
	
	$scope.doRefresh = function(){
		console.log("INFO: on refresh we fetch values from local storage again...")
		Favorites.favorites = JSON.parse( $localstorage.get('favorites') || "[]" )
		$scope.favorites = Favorites.all(Infos);
		$scope.$broadcast('scroll.refreshComplete');
		//$scope.$apply() 
	}
	
})

.controller('FavoriteDetailCtrl', function(
			$scope, 
			$stateParams, 
			Favorites, 
			$translate, 
			Infos,
			$rootScope
			) {
    console.log("DEBUG FavoriteDetailCtrl currentItem.infoId: ",$stateParams.favoriteId) 
  
    $scope.top = false // Is this it
	
    $scope.$on('$ionicView.enter', function(e) {
		var currFav = Favorites.get($stateParams.favoriteId);	
		console.log("DEBUG FavoriteDetailCtrl: currFav = " + JSON.stringify(currFav) )
		Infos.setLanguageKey($translate.use());
		// when we enter the view, we set the current item:
		$scope.item = Infos.get(currFav.infoId)
	    if ( $scope.item.isLocal ){
	  	  // local cached path to images:
	  	  $scope.server_image_url = "/img/info/"
  	
	    }else{
	  	  // path to images on the server:
	  	  $scope.server_image_url = $rootScope.CONFIG.apiUrl +"/pictures/"
  	
	    }
		$scope.top = currFav.top // is this Info-Item a Top Favorite?
    });
	
	

	
	$scope.switchIsTopFavorite = function(){
		var currFav = Favorites.get($stateParams.favoriteId); // maybe null (already removed, if tabbed several times)
		console.log("DEBUG: switch liked = set / unset as favorite: current-state of isLiked="+JSON.stringify(currFav) )
		if ($scope.top ){
			$scope.top = false
			Favorites.removeWithInfoId($stateParams.favoriteId)
		}else{
			$scope.top = true
			Favorites.addWithInfoId($stateParams.favoriteId, true)
		}
	}
 })

;
