angular.module('refugeeapp.controllers', [])

.controller('FavoritesCtrl', function($scope) {})

.controller('FavoriteDetailCtrl', function($scope, $stateParams) {
  $scope.settings = {
    enableFriends: true
  };
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


.controller('GoodsCtrl', function($scope, Items) {
	console.log("DEBUG GoodsCtrl: we have Items: ",Items.all());
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

})

.controller('GoodDetailCtrl', function($scope, $stateParams, Items) {
  console.log("DEBUG GoodDetailCtrl: All Items = ",Items.all() );
  console.log("DEBUG GoodDetailCtrl: currentItem: ",$stateParams.itemId );
  $scope.item = Items.get($stateParams.itemId);
})

;
