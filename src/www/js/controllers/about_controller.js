angular.module('refugeeapp.controllers.about_controller', [])

.controller('AboutCtrl', function(
			$scope,
			$translate,
			$rootScope) {
	$scope.appVersion = $rootScope.CONFIG.appVersion
	console.log("About-Controller: version="+$scope.appVersion)
})

;
