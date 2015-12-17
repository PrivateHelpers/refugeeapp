angular.module('refugeeapp.controllers.profile', [])

.controller('ProfileCtrl', function(
		$scope, 
		$stateParams, 
		$translate) {
	console.log("DEBUG Profile controlller");
	
    $scope.settings = {
      showDebug: true,
      langs:  [ {name:"English", id:"en"},
				{name:"Deutsch", id:"de"} ],
      lang:   {} 
    };
	
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
	
		
})

;