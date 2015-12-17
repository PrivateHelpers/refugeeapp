// refugeeapp build with IONIC

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'refugeeapp' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'refugeeapp.services' is found in services.js
// 'refugeeapp.controllers' is found in controllers.js
angular.module('refugeeapp', 
				['ionic', 
				 'pascalprecht.translate',  // inject the angular-translate module
				 'refugeeapp.controllers',
	 			 'refugeeapp.controllers.infos',
				 'refugeeapp.controllers.profile',
				 'refugeeapp.controllers.search',
 				 'refugeeapp.services',
				 'refugeeapp.services.infos'
				])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
  });

})

.config(function($ionicConfigProvider, // ??
				$stateProvider, 
				$urlRouterProvider,
				$translateProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
	$translateProvider
      .useStaticFilesLoader({
        prefix: 'js/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
        'de' : 'de', 'de_DE': 'de', 'de_CH': 'de'
      })
	  // TODO: set the default language (overriden by browser !!)
      .preferredLanguage('de') 
      .fallbackLanguage('de')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');
  
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    	url: '/tab',
    	abstract: true,
    	templateUrl: 'templates/tabs.html'
  	})

	

  // Each tab has its own nav history stack:

  .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
    })
    .state('tab.favorites.detail', {
      url: '/:favoriteId',
      views: {
        '@': {
          templateUrl: 'templates/tab-favorites-detail.html',
          controller: 'FavoriteDetailCtrl'
        }
      }
    })
	
	
  .state('tab.infos', {
    url: '/infos',
    views: {
      'tab-infos': {
        templateUrl: 'templates/tab-infos.html',
        controller: 'InfosCtrl'
      }
    }
  })
  .state('tab.infos.detail', {
    url: '/:infoId',
    views: {
      '@': {
        templateUrl: 'templates/tab-infos-detail.html',
        controller: 'InfoDetailCtrl'
      }
    }
  })
 
  .state('tab.goods', {
    url: '/goods',
    views: {
      'tab-goods': {
        templateUrl: 'templates/tab-goods.html',
        controller: 'GoodsCtrl'
      }
    }
  })

  .state('tab.goods.detail', {
    url: '/:itemId',
    views: {
      '@': {
		templateUrl: 'templates/tab-goods-detail.html',
        controller: 'GoodDetailCtrl'
      }
    }
  })


 .state('profile', {
     url: '/profile',
	 templateUrl: 'templates/profile.html',
	 controller: 'ProfileCtrl',
	 onEnter: function (){console.log("ENTER-STATE")}
    }
  )
  
  .state('search', {
      url: '/search',
 	 templateUrl: 'templates/search.html',
 	 controller: 'SearchCtrl',
 	 onEnter: function (){console.log("ENTER-search-controller-state")}
     }
   );

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/infos');

});
