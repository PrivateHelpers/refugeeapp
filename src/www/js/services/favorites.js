angular.module('refugeeapp.services.favorites', [])


.factory('Favorites', function($localstorage) {


  // the idea is to show all favorites
  // either as: last week items (first list "last search")
  // or as: to items (second list: "favorites with stars")
  //  {  top: true,
  // 	  timestamp: "2015-12-28T18:14:38.811Z",
  // 	  infoId: 17,
  //  },...
	  
  var favorites = JSON.parse( $localstorage.get('favorites') || "[]" )
  // TODO: on startup we might eleminate old entries
  removeEntriesOlderThanDays(7)
  
  function removeEntriesOlderThanDays(days) {
	  var now = new Date()
	  var saveAgain=false
	  var diff = days*24*60*60*1000
	  favorites.forEach( function(itm){
		  if ( (itm.top = false)  && ( (now - itm.timestamp) > diff) ){
		  	saveAgain = true
		  } 
	  });
	  if (saveAgain){
		  $localstorage.set('favorites', JSON.stringify(favorites) )
	  }
  }
  return {
    all: function(infos) {
		favorites.forEach(function(itm){
			var currInfo=infos.get(itm.infoId)
			if (currInfo){ // add (=reset) the title we retrieve from the Info-item
				itm.title=currInfo.title
			} // if
		}) // forEach
	  return favorites
    },
    add: function(newFav) { 
      favorites.push(newFav);
	  $localstorage.set('favorites', JSON.stringify(favorites) )
    },
    remove: function(fav) { 
	  console.log("DEBUG: removing from list of Favorites "+JSON.stringify(fav))
      favorites.splice(favorites.indexOf(fav), 1);
	  $localstorage.set('favorites', JSON.stringify(favorites) )
    },
	currentlyViewedInfoId: function(infoId){
		console.log("DEBUG: adding / updating Favorites the info id="+infoId)
		var curr_item=this.get(infoId)
		if (curr_item == null){
			curr_item = {
			    top: false,
				timestamp: new Date(),
				infoId: infoId
			} // curr_item
			this.add(curr_item)
			console.log("DEBUG: after adding "+JSON.stringify(curr_item)+" => new favorite-list: " + JSON.stringify(favorites) )
		}else{ // update the timestamp
			curr_item.timestamp = new Date()
			console.log("DEBUG: after update "+JSON.stringify(curr_item)+" => new favorite-list: " + JSON.stringify(favorites) )
		} // if else	
		$localstorage.set('favorites', JSON.stringify(favorites) )
	},
	addWithInfoId: function(infoId){
		this.currentlyViewedInfoId(infoId)
		var curr_item=this.get(infoId)
		curr_item.top=true
		$localstorage.set('favorites', JSON.stringify(favorites) )
	}, // function
	removeWithInfoId: function(infoId){
		console.log("DEBUG: removing from Favorites the info id="+infoId+" by setting top to false")
		var curr_item=this.get(infoId)
		curr_item.top=false
		$localstorage.set('favorites', JSON.stringify(favorites) )
	},
    get: function(infoId) { // TODO: i18n  
		console.log("DEBUG: Favorites-ALL: "+JSON.stringify( favorites ) )
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].infoId == infoId ) {
		  console.log("DEBUG: Favorites info id="+infoId+" FOUND: "+JSON.stringify( favorites[i]) )
          return favorites[i];
        }
      }
	  console.log("DEBUG: Favorites info id="+infoId+" NOT FOUND")
      return null;
    }
  }; // return

}) // function


;