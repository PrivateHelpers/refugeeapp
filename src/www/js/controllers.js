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
.controller('FeedbackCtrl', function(
		$scope,
		$translate,
		$localstorage
		) {
	console.log("Feedback-Controller: ...")
	
    $scope.feedback = {
      	from:   {email:"Anonymous", id:"anon"},
		email: 	"..me..",
      	fromList:  [  {email:"Anonymous", 	id:"anon"},
					  {email: "Email", 		id:"me"  } 
				   ]
    };
		
  	$scope.feedback.email = $localstorage.get('email') || ""	
  	$scope.feedback.from.email  = $localstorage.get('from')  || "anon"
	
	$scope.$watch('feedback.from', function() {
		console.log("we store the feedback.from="+JSON.stringify( $scope.feedback.from) )
		if ($scope.feedback.from.id == "anon"){
			console.log(" feedback-from anonymous")
			$localstorage.set('from',"anon");
		}else{
			// TODO: set email (via popup) if user selects email (or provide link)
			var email = $localstorage.get('email') || "Please, set your email in profile!"
			console.log(" feedback-from email="+ email)
			$localstorage.set('from', email);
			$scope.feedback.fromList[1].email = email
		}
	})
	
	$scope.sendNow = function(){
		console.log("send feedback now..")
	}
	
})
;
