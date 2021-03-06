// refugeeapp build with IONIC




// angular.module is a global place for creating, registering and retrieving Angular modules
// 'refugeeapp' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('refugeeapp', 
				['ionic', 
				 'ngResource',				 // we want RESTful API calls with resources
				 
				 'pascalprecht.translate',   // inject the angular-translate module
				 'ionic.ion.imageCacheFactory', // caching images

				 'refugeeapp.services',
				 //'refugeeapp.services.items',
				 'refugeeapp.services.infos',
				 'refugeeapp.services.favorites',

				 'refugeeapp.controllers.infos_controller',
 				 'refugeeapp.controllers.goods_controller',
				 'refugeeapp.controllers.profile_controller',
				 'refugeeapp.controllers.search_controller',
				 'refugeeapp.controllers.feedback_controller',
				 'refugeeapp.controllers.favorites_controller',
				 'refugeeapp.controllers.about_controller'

				])

.run(function(	$ionicPlatform,
				$localstorage,
				$translate,
				$rootScope,
				$location
) {
	
	
	
	// we set up the global values to 
	// access the web service api:
	//  $rootScope.CONFIG.apiUrl = http://localhost:5000
	//  (e.g. to use later: http://localhost:5000/widgets/:id:format )
	// TODO: put the configs into a file	
	var proto = $location.protocol()
	var host  = $location.host()
	var port  = $location.port()
	if (host != 'localhost'){ // we are in live-mode on heroku
		proto = "https"
		host = 'privatehelpersws.herokuapp.com' 
		port = ''
	}else{ // we are in local debug mode 
		port = ":" + 5000 // on localhost we ran the webservice on port 5000
		}
	$rootScope.CONFIG = {
	    appVersion: "Version 0.2.0 (27. Dec. 2015)",
	    apiUrl: proto+'://'+host+port
	}
	
	// Note: it would be too early to set the language in platform ready!!
	//       because: WHY?? Who calls "setCurrLanguagKey()"
	// var lang = $localstorage.get('language')
	// if (lang){
	// 	console.log("LOCAL-STORAGE: LANG we should set the language to "+lang)
	// 	$translate.use(lang)
	// }
	
	
	
	
  $ionicPlatform.ready(function() {
	  
    // Hide the accessory bar by default 
	// (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	

	console.log("DEBUG: Is the camera ready? navigator.camera="+navigator.camera);
	

  });

  $rootScope.$on('$stateChangeStart', function (event, next, current) {
	  console.log("INFO: (event=)"+event.name+"): the sate is changing from "+current.name+" to another state "+next.name+" with url " +next.url)
  });
 
})

.config(function($ionicConfigProvider, // ??
				$stateProvider, 
				$urlRouterProvider,
				$translateProvider,
				$resourceProvider
				) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
	
	

	
	
	
	
	 // Don't strip trailing slashes from calculated URLs
	$resourceProvider.defaults.stripTrailingSlashes = false;
	
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
      .useSanitizeValueStrategy('escapeParameters')
	  ;
  
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    	url: '/tab',
    	abstract: true,
    	templateUrl: 'templates/tabs.html',
		onEnter: function (){console.log("Debug-Info: we enter state 'tab'.")}
  	})

	

  // Each tab has its own nav history stack:

  // Favorites TAB:
  // ==============
  .state('tab.favorites', { // hierachical state should provide "back button" when suitable
      url: '/favorites',    // for urls such as: <a href="#/favorites" ...
      views: {              // in tabs.html:
        'navview-tab-favorites': {  //  <ion-nav-view name="tab-favorites" in tabs.html.
          templateUrl: 'templates/tab-favorites.html',
          controller: 'FavoritesCtrl',
		  onEnter: function (){console.log("Debug-Info: we enter state 'tab.favorites'.")}
        }
      }
    })
    .state('tab.favorites.detail', {
      url: '/:favoriteId',
      views: {
        'navview-tab-favorites@tab': { // viewname@statename
          templateUrl: 'templates/tab-infos-detail.html',
          controller: 'FavoriteDetailCtrl',
		  onEnter: function (){console.log("Debug-Info: we enter state 'tab.favorites.detail'.")}
        }
      }
    })
	
	
    // INFO TAB:
    // =========
  .state('tab.infos', {
    url: '/infos',
	parent: "tab",
    views: {
		'navview-tab-infos': {  
	    templateUrl: 'templates/tab-infos.html',
        controller: 'InfosCtrl',
		// resolve: {
		//     resolvedInfos: function(Infos,$translate){
		// 		console.log("DEBUG: we load the infos before moving to INFO-TAB!")
		// 		Infos.setLanguageKey( $translate.use() ||"en" );
		//     	return Infos.all();
		// 	}
		// },
		onEnter: function (){
			console.log("Debug Infos: we enter state 'tab.infos'.")
			console.log("Debug Infos: history="+JSON.stringify($ionicHistory.viewHistory(), null, 4) );
		}
      }
    }
  })
  .state('tab.infos.detail', { // used in: 
    url: '/:infoId',           //          ui-sref="tab.infos.detail( {infoId: item.id} )"
    views: {
		'navview-tab-infos@tab': { 
		templateUrl: 'templates/tab-infos-detail.html',
        controller: 'InfoDetailCtrl',
		onEnter: function (){
			console.log("Debug Infos-Detail: we enter state 'tab.infos.detail'.")
			console.log("Debug Infos-Detail: history="+JSON.stringify($ionicHistory.viewHistory(), null, 4) );
		}
      }
    }
  })
 
 
  // GIVE AND TAKE TAB:
  // ================== 
  .state('tab.goods', {
    url: '/goods',
	parent: "tab",
    views: {
      'navview-tab-goods': { 
        templateUrl: 'templates/tab-goods.html',
        controller: 'GoodsCtrl',
		onEnter: function (){console.log("Debug-Info: we enter state 'tab.goods'.")}
      }
    }
  })

  .state('tab.goods.detail', {
    url: '/:itemId',
    views: {
      'navview-tab-goods@tab': {
		templateUrl: 'templates/tab-goods-detail.html',
        controller: 'GoodDetailCtrl',
		onEnter: function (){console.log("Debug-Info: we enter state 'tab.goods.detail'.")}
      }
    }
  })



  // SINGLE PAGES (no tab bar):
  // ==========================
 .state('profile', {
     url: '/profile',
	 templateUrl: 'templates/profile.html',
	 controller: 'ProfileCtrl',
	 onEnter: function (){console.log("Debug-Info: we enter state 'profile'.")}
    }
  )
  
  .state('search', {
      url: '/search',
 	 templateUrl: 'templates/search.html',
 	 controller: 'SearchCtrl',
	 onEnter: function (){console.log("Debug-Info: we enter state 'search.")}
 }
   )
   
   
   .state('about', {
       url: '/about',
       views: {
       		'navview-tab-infos@tab': { 
				templateUrl: 'templates/about.html',
  	 			controller: 'AboutCtrl',
	 			onEnter: function (){
					console.log("Debug-Info: we enter state 'about'.")
				}
      	  	}
    	}
    })
   
    .state('feedback', {
        url: '/feedback',
   	 templateUrl: 'templates/feedback.html',
   	 controller: 'FeedbackCtrl',
	 onEnter: function (){console.log("Debug-Info: we enter state 'feedback'.")}
       }
     )
   ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/infos');


   /* TODO: check if we need to allow file in imag urls:
   	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
   */

})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])


 /*
	Note for taking photos we need: 
		cordova plugin add cordova-plugin-camera
 */
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera && navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])

;
