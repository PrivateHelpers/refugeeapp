angular.module('refugeeapp.controllers.goods_controller', [])

.controller('GoodsCtrl', function(
		$scope, 
		Items, 
		$translate,
		$ionicModal,
	    $localstorage,
		Camera,
		$rootScope,
		$resource
		) {

	/*
		We define a RESTful Resource to create/retrieve/update/delete
		data on the RoR Web server:     POST  / GET    / UPDATE / DELETE

		elements/attributes (see rails console: Offer)
		=> Offer(id: integer, user_id: integer, approved: boolean,
			 language_id: integer, title: string, description: text, 
			contact_email: string, contact_person: string, contact_street: string, 
			contact_zip: string, contact_city: string, contact_tel: string, 
			contact_url: string, contact_gps_latitude: decimal, 
			contact_gps_longitude: decimal, image_id: integer, 
			notes: text, active: boolean, admin_notes: text, 
			created_at: datetime, updated_at: datetime) 
			
	*/
	$scope.ItemsResource = $resource(
		//  e.g.: http://localhost:5000/offers/:id:format
		$rootScope.CONFIG.apiUrl +'/offers/:id:format', 
		{id:'@id'}, // paramDefaults: take the id out of the object (@id), automatically
	  	{ 	'get':    {method:'GET'},
	    	'save':   {method:'POST'},
	   	 	'query':  {method:'GET', isArray:true},
	    	'update':  {method:'PUT'},
		    'remove': {method:'DELETE'},
	    	'delete': {method:'DELETE'}
		}
	);
	/* example: curl 'http://localhost:5000/offers.json' */

	
	$scope.server_image_url = "/img/offers/" // we start with local data
	

	
	// we set the language to specify which data set we like to have
	Items.setLanguageKey( $translate.use() );
	
	$scope.newoffer={
		title: 			"",
		description: 	"",
		comments: 		"",
	}
	
	
     $scope.newoffer.title  = 	   $localstorage.get('newoffer.title') || ""
     $scope.newoffer.description = $localstorage.get('newoffer.description') || ""
     $scope.newoffer.comments =    $localstorage.get('newoffer.comments') || ""
	
    $scope.$watch('newoffer.title', function() { 
  	  				$localstorage.set('newoffer.title', $scope.newoffer.title); })
    $scope.$watch('newoffer.description', function() { 
  	  				$localstorage.set('newoffer.description', $scope.newoffer.description); })
    $scope.$watch('newoffer.comments', function() { 
  	 	 			$localstorage.set('newoffer.comments', $scope.newoffer.comments ); })
  
	
	
	
	// initialise the (current used) data:
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
	
	// $scope.refreshData = function(){
	// 	console.log("TODO: refresh the data")
	// }
	
	// we got the broadcast notification, that the background data has changed
	// e.g. the language was switched
	// $scope.$on("updateTheData", function() {
	//     // signal that data changed, lazy load when the tab is actually clicked
	// 	console.log("GOT-NOTIFIED: DATA CHANGED")
	//     $scope.items = Items.all();
	// });

    $scope.$on('$ionicView.enter', function(e) {
		// maybe someone has entered (or removed) her/his email in the meantime
		$scope.email = $localstorage.get('email') || ""
		// maybe the language has changed, so we need to update the data:
    	Items.setLanguageKey($translate.use());
  		$scope.items = Items.all();	
    });
	
	$scope.sendMyNewOffer = function(){
		console.log("TODO: send a new offer...")
		$scope.openModal()
	}
	
	
	
	/* MODAL for sending new offer */
    $ionicModal.fromTemplateUrl('contact-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openModal = function() {
      $scope.modal.show()
    }

    $scope.closeModal = function() {
	  console.log("TODO: close modal and send a new offer...")
		//  TODO: if successful uploaded to server: 
		//  TODO:       clear variables
		//  TODO:       put into local "watch-waiting-approval-queue"
		$scope.newoffer={
			title: 			"",
			description: 	"",
			comments: 		"",
			photo: null
		};
      $scope.modal.hide();
    };
    $scope.cancelModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
	
	
	// Add Photo functionality:
	$scope.photosEnabled = (navigator.camera != null)
    $scope.getPhoto = function() {
      Camera.getPicture().then(function(imageURI) {
        console.log("INFO: image-uri="+imageURI);
        $scope.newoffer.photo = imageURI;
      }, function(err) {
        console.err("ERROR on taking an image: "+err);
      }, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: true
      });
    };


	$scope.doRefresh = function(){
		console.log("Refreshing the Goods-Items data from the server: ")
		
		$scope.ItemsResource.query(
			{format:".json"},
			function(itemsJSONData){
				console.log("!! All the Items: " + JSON.stringify(itemsJSONData) )

				// update all the "background"-data items = offers (=goods)
				Items.refreshTheDataAfterDownload(itemsJSONData)
				// set the image path to remote server
				$scope.server_image_url = $rootScope.CONFIG.apiUrl +"/thumbs/"
				// switch to selected language
				Items.setLanguageKey($translate.use());
				// load data for the GUI to display
				$scope.items = Items.all();
				// update GUI
				$scope.updateUIafterRefresh()
				
			},
			function(err){
				console.log("ERROR on retrieving the updated good-items: "+err)
			}
		);
		
		this.updateUIafterRefresh()
	};
	// some helpers:
	$scope.updateUIafterRefresh = function(){
		var d = new Date()
		$translate('GOODS.LAST_UPDATE').then( function(luStr){
			$scope.lastUpdateTimestamp = luStr+" "+ d.toLocaleDateString() + " " + d.toTimeString().slice(0,5)+"."
			$scope.$broadcast('scroll.refreshComplete');
		})
		
	}


})

.controller('GoodDetailCtrl', function(
		$scope, 
		$stateParams, 
		Items, 
		$translate,
		$rootScope
		) {
  console.log("DEBUG GoodDetailCtrl: All Items = ",Items.all() );
  console.log("DEBUG GoodDetailCtrl: currentItem: ",$stateParams.itemId );
  
  $scope.item = Items.get($stateParams.itemId);
	  
  if ( $scope.item.isLocal ){
	  // local cached path to images:
	  $scope.server_image_url = "/img/offers/"
  	
  }else{
	  // path to images on the server:
	  $scope.server_image_url = $rootScope.CONFIG.apiUrl +"/pictures/"
  	
  }
  
  
  $scope.$on('$ionicView.enter', function(e) {
  	Items.setLanguageKey($translate.use());
	$scope.item = Items.get($stateParams.itemId);	
  });
  	

})


;
