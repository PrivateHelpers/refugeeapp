angular.module('refugeeapp.controllers.goods_controller', [])

.controller('GoodsCtrl', function(
		$scope, 
		Items, 
		$translate,
		$ionicModal,
	    $localstorage,
		Camera
		) {
	
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
	
	$scope.refreshData = function(){
		console.log("TODO: refresh the data")
	}
	
	// we got the broadcast notification, that the background data has changed
	// e.g. the language was switched
	// $scope.$on("updateTheData", function() {
	//     // signal that data changed, lazy load when the tab is actually clicked
	// 	console.log("GOT-NOTIFIED: DATA CHANGED")
	//     $scope.items = Items.all();
	// });

    $scope.$on('$ionicView.enter', function(e) {
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

})

.controller('GoodDetailCtrl', function($scope, $stateParams, Items, $translate) {
  console.log("DEBUG GoodDetailCtrl: All Items = ",Items.all() );
  console.log("DEBUG GoodDetailCtrl: currentItem: ",$stateParams.itemId );
  
  $scope.item = Items.get($stateParams.itemId);
  
  $scope.$on('$ionicView.enter', function(e) {
  	Items.setLanguageKey($translate.use());
	$scope.item = Items.get($stateParams.itemId);	
  });
  	

})


;
