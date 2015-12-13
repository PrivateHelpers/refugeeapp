angular.module('refugeeapp.controllers', [])

.controller('FavoritesCtrl', function($scope,
	$translate  //inject the $translate service
	) {
	
    $scope.settings = {
  	  enableFriends: true,
      showDebug: true,
      langs:  [ {name:"English", id:"en"},
				{name:"Deutsch", id:"de"} ],
      lang:   {} 
    };
	// per default english
	$scope.settings.lang = $scope.settings.langs[1]
	
	$scope.switchLanguage = function(key) {	  
	  console.log(" DEBUG-INFOS: we switch the GUI to lang-key='"+key+"'")
  	  $translate.use(key);
	};
	$scope.$watch('settings.lang', function() {
	  console.log('DEBUG-Dropdown: The lang has changed to '+$scope.settings.lang.id);
	  // TODO: refresh the list on all the tabs/pages !!
	  //       e.g. the items in Scope GoodsCtrl
	  $scope.switchLanguage($scope.settings.lang.id)	 
	});
})

.controller('FavoriteDetailCtrl', function($scope, $stateParams) {

 })

.controller('InfosCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.searchInfos = function(){
  	console.log("DEBUG-INFOS: TODO implement searching...")
  };
  $scope.openProfile = function(){
  	console.log("DEBUG-INFOS: TODO implement profile and settings")
  }
})


.controller('GoodsCtrl', function($scope, Items, $translate) {
	console.log("DEBUG GoodsCtrl: We load items for current language=",$translate.use())
	$scope.lang_key=$translate.use()
	console.log("DEBUG GoodsCtrl:   we got Items: ",Items.all($scope.lang_key));
    $scope.items = Items.all($scope.lang_key);
    $scope.remove = function(item) {
      Items.remove(item);
    };
	$scope.filterOtherOffers = function(element) {
	  return element.my == false;
	};
	$scope.filterMyOffers = function(element) {
	  return element.my == true;
	};

})

.controller('GoodDetailCtrl', function($scope, $stateParams, Items) {
  console.log("DEBUG GoodDetailCtrl: All Items = ",Items.all() );
  console.log("DEBUG GoodDetailCtrl: currentItem: ",$stateParams.itemId );
  $scope.item = Items.get($stateParams.itemId);
})

;
