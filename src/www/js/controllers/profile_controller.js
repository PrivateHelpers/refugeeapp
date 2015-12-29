angular.module('refugeeapp.controllers.profile_controller', [])

.controller('ProfileCtrl', function(
		$scope, 
		$stateParams, 
		$translate,
		$localstorage,
		$rootScope
		) {
	console.log("DEBUG Profile controlller");
	
    $scope.settings = {
      showDebug: true,
	  // language dropdown with selected language
      langs:  [ {name:"English", id:"en"},
				{name:"Deutsch", id:"de"} ],
      lang:   {},
    };
	
	// default for the dropdown to en or de <= see defaults for translate 
	console.log("D-E-B-U-G: tanslate.use = "+ $translate.use() )
	if ( $translate.use() == "en" ){
		$scope.settings.lang = $scope.settings.langs[0] // en
	}else{
		$scope.settings.lang = $scope.settings.langs[1] // de
	};
	
	$scope.switchLanguage = function(key) {	  
	  console.log(" DEBUG-PROFILE-SETTINGS: we switch the GUI to lang-key='"+key+"'")
  	  $translate.use(key);
	  $localstorage.set('language', key);
	  // TODO: broadcast to the other views to refresh the GUI with new data (with new lang):
	  console.log(" DEBUG-PROFILE-SETTINGs: and now we tell everyone and send a broadcast...")
	  $rootScope.$broadcast('language.haschanged', {lang: key});
	};
	$scope.$watch('settings.lang', function() {
	  console.log('DEBUG-Dropdown: The lang has changed to '+$scope.settings.lang.id);
	  $scope.switchLanguage($scope.settings.lang.id)	 
	});
	
	$scope.$watch('settings.name', function() {
		 console.log('DEBUG save state to prefs: name='+$scope.settings.name)
		$localstorage.set('name', $scope.settings.name);
	})
	$scope.$watch('settings.email', function() {
		console.log('DEBUG save state to prefs: email='+$scope.settings.email)
		$localstorage.set('email', $scope.settings.email);
	})
	
	
	// When loading this controller we initialise the settings from
	// local storage (if available)
  	$scope.settings.name  = $localstorage.get('name') || ""
  	$scope.settings.email = $localstorage.get('email') || ""
	
})

;