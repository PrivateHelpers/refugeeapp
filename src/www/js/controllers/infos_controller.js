angular.module('refugeeapp.controllers.infos_controller', [])

.controller('InfosCtrl', function($scope,
		$translate,
		Infos,
		$location,
	    $localstorage,
		resolvedInfos, // set up in app.js for state "tab.infos"
	    $resource,
	    $rootScope
		

		) {


	/*
		We define a RESTful Resource to create/retrieve/update/delete
		data on the RoR Web server:     POST  / GET    / UPDATE / DELETE

		elements/attributes
			:id, :language_id, :category_id, :tag, :title, :description, 
			:description_html, :image_id, :contact_email, :contact_person, 
			:contact_street, :contact_zip, :contact_city, :contact_tel, 
			:contact_url, :contact_hours, :contact_gps_latitude, :contact_gps_longitude, 
			:notes, :active, :admin_notes, :created_at, :updated_at, :lang, :cat
	*/
	$scope.InfoResource = $resource(
		//  e.g.: http://localhost:5000/infos/:id:format
		$rootScope.CONFIG.apiUrl +'/infos/:id:format', 
		{id:'@id'}, // paramDefaults: take the id out of the object (@id), automatically
	  	{ 	'get':    {method:'GET'},
	    	'save':   {method:'POST'},
	   	 	'query':  {method:'GET', isArray:true},
	    	'update':  {method:'PUT'},
		    'remove': {method:'DELETE'},
	    	'delete': {method:'DELETE'}
		}
	);

	/* Functionality for the list of infos:
	
		a) retrieve from URL 
			on update:
				each week <= TODO
				manually
		b) fallback (use locally cached data)

	*/	
	
	/* example: curl 'http://localhost:5000/infos/3.json'
		=> 
	{"id":3,"language_id":17,"category_id":13,"tag":null,
	"title":"Deutschkurse an der KF Uni Graz",
	"description":"Bitte kontaktieren Sie das International Office für Informationen über die nächsten Termine für die Deutschkurse.",
	"description_html":"Bitte kontaktieren Sie das \u003ca href=\"#intoffice\"\u003eInternational Office\u003c/a\u003e für die nächtsten Termine der Deutschkurse",
	"image_id":null,"contact_email":"office@kfunigraz.at",
	"contact_person":"Mr. Max","contact_street":"Elisabethstraße 45","
	contact_zip":"8020","contact_city":"Graz","contact_tel":"+43 316 99887766",
	"contact_url":"http://www.kfunigraz.at/deutschkurse","contact_hours":"0-24h",
	"contact_gps_latitude":"15.4","contact_gps_longitude":"47.07",
	"notes":"\u003cb\u003eBitte\u003c/b\u003e klicken Sie auf folgenden \u003ca href=\"#back\"\u003eLink\u003c/a\u003e, um weitere Informationen bezüglich der Austrian Language Card zu erhalten.",
	"active":null,"admin_notes":"auto-inserted with script from admin",
	"created_at":"2015-12-29T10:03:39.129Z",
	"updated_at":"2015-12-29T10:03:39.129Z",
	"lang":"en","cat":"language"}
	
	*/
	
	
	// on reload, we try to reload the data from the webservice:
	$scope.doRefresh = function(){
		$scope.InfoResource.query(
			{format:".json"},
			function(infoMessages){
				console.log("!! All the infos: " + JSON.stringify(infoMessages) )

				Infos.refreshTheDataAfterDownload(infoMessages)
				Infos.setLanguageKey($translate.use());
				$scope.items = Infos.all();
				
				
				
				$scope.updateUIafterRefresh()
				
			},
			function(err){
				console.log("ERROR on retrieving the updated infos: "+err)
			}
		);
		
	}
		
	
	// some helpers:
	$scope.updateUIafterRefresh = function(){
		var d = new Date()
		$translate('INFO.LAST_UPDATE').then( function(luStr){
			$scope.lastUpdateTimestamp = luStr+" "+ d.toLocaleDateString() + " " + d.toTimeString().slice(0,5)+"."
			$scope.$broadcast('scroll.refreshComplete');
		})
		
	}
	
  $scope.server_image_url = $rootScope.CONFIG.apiUrl +"/thumbs/"
  $scope.lastUpdateTimestamp="Last-Update: Pull to refresh"
  
  $scope.openProfile = function(){
  	console.log("DEBUG-INFOS: TODO implement profile and settings")
  }
  
  // resolved before setting up the view:
  //  find resolve in app.js state "tab.infos"
  $scope.items = resolvedInfos;
  
  
  $scope.filterLocationAndRouting = function(element) {
	return element.category == "location"
    //return  'location'.indexOf(element.tags) >=0; // element.location == true;
  };
  $scope.filterLanguage = function(element) {
	return element.category == "language"
    //return   'language'.indexOf(element.tags) >=0;
  };
  $scope.filterMedi = function(element) {
	return element.category == "medi"
    //return   'medi'.indexOf(element.tags) >=0;
  };
  $scope.filterCulture = function(element) {
	return element.category == "culture"
    //return   'culture'.indexOf(element.tags) >=0;
  };
  $scope.filterOthers = function(element) {
    return 	element.category != "location" &&
	  		element.category != "language" &&
	  		element.category != "culture" &&
	  		element.category != "medi"
    // return  'medi'.indexOf(element.tags) ==0 &&
    // 	  		'language'.indexOf(element.tags) ==0 &&
    // 	 	 	'location'.indexOf(element.tags) ==0 &&
    // 	 	 	'culture'.indexOf(element.tags) ==0
    // 	  		 ;
  };
 
  // we got the broadcast notification, that in the background 
  // something has changed: here the current language was switched
  $scope.$on("language.haschanged", function(evt, data) {
	// TODO check if necessary, maybe we reload in resolve (see app.js for state tab.infos) 
    // signal that data changed, lazy load when the tab is actually clicked
	console.log("GOT-NOTIFIED: Language has CHANGED to '"+data.lang+"'  => please switch to new language and reload info-data")
	Infos.setLanguageKey($translate.use());
    $scope.items = Infos.all();
  });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
  	console.log("INFO: we enter the infos view. So we check/set the language")
	// TODO check if necessary, maybe we reload in resolve (see app.js for state tab.infos) 
	//Infos.setLanguageKey($translate.use());
	//$scope.items = Infos.all();
  });
  $scope.$on('$ionicView.loaded', function(e){
  	console.log("INFO: the infos view is generated (ONCE). we check for language in the local storage...")
  	var lang = $localstorage.get('language')
  	if (lang){
  		console.log("LOCAL-STORAGE: LANG we should set the language to "+lang)
  		$translate.use(lang)
  	}
	//Infos.setLanguageKey($translate.use());
	//$scope.items = Infos.all();
  });


  $scope.navigateTo = function ( path ) {
	  console.log("INFO: we navigate to url: "+ path)
      $location.path( path );
    };




	

})

.controller('InfoDetailCtrl', function(
	$scope, 
	$stateParams, 
	Infos, 
	$translate, 
	$ionicHistory,
	Favorites,
	$rootScope
	) {
   
  $scope.server_image_url = $rootScope.CONFIG.apiUrl +"/thumbs/"
		
  Infos.setLanguageKey( $translate.use() );
  console.log("DEBUG InfoDetailCtrl: All Infos = ",Infos.all() );
  console.log("DEBUG InfoDetailCtrl: currentItem: ",$stateParams.infoId );
  
  $scope.item = Infos.get($stateParams.infoId);
  
  $scope.top = false
  
  $scope.switchIsTopFavorite = function(){
	  if ( $scope.top ){
		$scope.top = false
	  	Favorites.removeWithInfoId( $stateParams.infoId )
	  }else{
		$scope.top = true
	  	Favorites.addWithInfoId( $stateParams.infoId , true)	
	  }
  }
  
  $scope.$on('$ionicView.enter', function(e) {
  	Infos.setLanguageKey($translate.use());
	$scope.item = Infos.get($stateParams.infoId);	
	$scope.top = Favorites.get($stateParams.infoId) && Favorites.get($stateParams.infoId).top
	
	// add to "Last-Search, Last-Viewed favorites"
	Favorites.currentlyViewedInfoId($stateParams.infoId)
  });
  
  $scope.goBack = function() {
	  console.log("INFO InfosDetailCtrl: go Back to")
	  console.log("     history="+JSON.stringify($ionicHistory.viewHistory(), null, 4) );
      $ionicHistory.goBack();
    };
  
})


;
