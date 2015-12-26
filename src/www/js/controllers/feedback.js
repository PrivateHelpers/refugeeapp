angular.module('refugeeapp.controllers.feedback', [])

.controller('FeedbackCtrl', function(
		$scope,
		$translate,
		$localstorage,
		$resource,
		$location 
		) {
	console.log("Feedback-Controller: ...")
	
	
    $scope.feedback = {
		title: "",
		description: "",
      	from:   {email:"Anonymous", id:"anon"},
		email: 	"..me..",
      	fromList:  [  {email:"Anonymous", 	id:"anon"},
					  {email: "Email", 		id:"me"  } 
				   ]
    };
		
  	$scope.feedback.email = $localstorage.get('email') || ""	
  	$scope.feedback.from.email  = $localstorage.get('from')  || "anon"
	
	$scope.$watch('feedback.from', function() {
		console.log("we store the feedback.from="+JSON.stringify( $scope.feedback.from) )
		if ($scope.feedback.from.id == "anon"){
			console.log(" feedback-from anonymous")
			$localstorage.set('from',"anon");
		}else{
			// TODO: set email (via popup) if user selects email (or provide link)
			var email = $localstorage.get('email') || "Please, set your email in profile!"
			console.log(" feedback-from email="+ email)
			$localstorage.set('from', email);
			$scope.feedback.fromList[1].email = email
		}
	})
	
	
	
	
	/*
		We define a RESTful Resource to create/retrieve/update/delete
		data on the RoR Web server:     POST  / GET    / UPDATE / DELETE
	
		TODO:
			setup proper elements/attributes
			id, email, title, description, created
			show created - timestamp on GUI
		TODO:
			add USER - for each feedback !
			(and maybe: only allow user-related feedback to be deleted)
	
	*/
	var host = $location.host()
	var port = $location.port()
	if (port != 80){ port = 5000 } // we are in debug mode (on heroku we have port 80)
	
	$scope.FeedbackResource = $resource(
		//'http://localhost:5000/widgets/:id:format', // url <= TODO configure at ??? and change from widget to feedback!!
		'http://' + host + ':'+port+'/widgets/:id:format', 
		{id:'@id'}, // paramDefaults: take the id out of the object (@id), automatically
	  	{ 	'get':    {method:'GET'},
	    	'save':   {method:'POST'},
	   	 	'query':  {method:'GET', isArray:true},
	    	'update':  {method:'PUT'},
		    'remove': {method:'DELETE'},
	    	'delete': {method:'DELETE'}
		}
	);
	
	
	/* Functionality for Feedback
	
		a) create new feedback on the GUI
			(shown above the reverse-sorted list of previous feedback)
		b1) try to store it on the server (if network is available)
		b2) or queue it to the feedback queue (if network is not available)
		
		c) resend later (if network is available again)
		d) update GUI: show Feedback sent / Feedback in queue / new Feedback
	*/	
	
	
	// on startup, we fill the feedbackMessagesAlreadySent list (from local cache)
	$scope.feedbackMessagesAlreadySent = JSON.parse( $localstorage.get('feedbackMsgesSent') || "[]" )
	// we do NOT show the log of former feedback messages on startup
	$scope.feedbackMessagesSentVisible = false
	
	// on reload, we try to reload the data from the webservice:
	$scope.doRefresh = function(){
		$scope.FeedbackResource.query(
			{format:".json"},
			function(feedbackMessages){
				console.log("!! Feedback: " + JSON.stringify(feedbackMessages) )
				$scope.feedbackMessagesAlreadySent = feedbackMessages
				$localstorage.set('feedbackMsgesSent', JSON.stringify(feedbackMessages) )
				$scope.updateUIafterRefresh()
			}
		);
		
	}
	
	// on startup, we fill the feedbackMessagesQueue list (from local cache)
	$scope.feedbackMessagesQueue = JSON.parse( $localstorage.get('feedbackMessagesQueue') || "[]" )
	
	// if sending did not work, we might try again:
	// TODO: maybe a timer could (first check the network and) try again later.... 
	$scope.trySendingAgain = function(){
		$scope.feedbackMessagesQueue.forEach(function(feedbackMsg){
			var newFeedbackMsg =  new $scope.FeedbackResource(feedbackMsg)
			newFeedbackMsg.$save({ // optional save-params
					},function(err){ // on error
						console.log("save-error!:" + JSON.stringify(err))
					},function(success){ // on success
						console.log("saving worked!: " + JSON.stringify(success) )
						var index = $scope.feedbackMessagesQueue.indexOf(feedbackMsg);
						if (index != -1) {
						   $scope.feedbackMessagesQueue.splice(index, 1);
						   $localstorage.set('feedbackMessagesQueue', JSON.stringify($scope.feedbackMessagesQueue) )
						}
						// Add message to queue (we have no id, so we have to reload data from server !!)	
						$scope.doRefresh()
					}
			);
		})
	}
	
	$scope.removeFeedbackmessageFromQueue = function(feedbackMessage){
		console.log("DEBUG remove a message from the queue...:"+JSON.stringify(feedbackMessage) )
		var index = $scope.feedbackMessagesQueue.indexOf(feedbackMessage);
		if (index != -1) {
		   $scope.feedbackMessagesQueue.splice(index, 1);
		   $localstorage.set('feedbackMessagesQueue', JSON.stringify($scope.feedbackMessagesQueue) )
		}	
	}
	$scope.removeFeedbackmessageOnServer = function(feedbackMessage){
		console.log("DEBUG remove a message from the queue...:"+JSON.stringify(feedbackMessage) )
		var index = $scope.feedbackMessagesAlreadySent.indexOf(feedbackMessage);
		if (index != -1) {
			// try now: 
			 var msgToDel = new $scope.FeedbackResource(feedbackMessage)
			 msgToDel.$delete(function(error){
				 console.log("ERROR: ")
			 	console.log(JSON.stringify(error)	)
			 }, function(success){
			 	console.log(success)
	  		   $scope.feedbackMessagesAlreadySent.splice(index, 1);
	  		   $localstorage.set('feedbackMsgesSent', JSON.stringify($scope.feedbackMessagesAlreadySent) )
			   // no reload such as $scope.doRefresh() necessary
			 })			
		}	
	}
		
	
	// some helpers:
	$scope.updateUIafterRefresh = function(){
		var d = new Date()
		$translate('FEEDBACK.LAST_UPDATE').then( function(luStr){
			$scope.lastUpdateTimestamp = luStr+" "+ d.toLocaleDateString() + " " + d.toTimeString().slice(0,5)
			$scope.$broadcast('scroll.refreshComplete');
			// changes (would not be necessary for $http.get with promise) 
			//$scope.$apply() // we did changes to the scipe outside a digest cycle! 
		})
		
	}
	
	
	
	$scope.sendNow = function(){
		var newFeedbackMsg =  new $scope.FeedbackResource({
			'name': 		$scope.feedback.title,
			"description": 	$scope.feedback.description,
			"timestamp": 	"modified: "+new Date(),
			"email": 		$scope.feedback.from.id == "anon" ? null : $scope.feedback.email 
			});
		$scope.feedback.title=""
		$scope.feedback.description=""
		$scope.feedbackMessagesQueue.push(newFeedbackMsg)
		$localstorage.set('feedbackMessagesQueue', JSON.stringify($scope.feedbackMessagesQueue) )
		
		
		newFeedbackMsg.$save({ // optional save-params
				},function(err){ // on error
					console.log("save-error!:" + JSON.stringify(err))
				},function(success){ // on success
					console.log("saving worked!: " + JSON.stringify(success) )
					var index = $scope.feedbackMessagesQueue.indexOf(newFeedbackMsg);
					if (index != -1) {
					   $scope.feedbackMessagesQueue.splice(index, 1);
					   $localstorage.set('feedbackMessagesQueue', JSON.stringify($scope.feedbackMessagesQueue) )
					}
					// Add message to queue (we have no id, so we have to reload data from server !!)	
					$scope.doRefresh()	
						
		})
	}


})

;