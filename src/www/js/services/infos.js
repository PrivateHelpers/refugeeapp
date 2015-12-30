angular.module('refugeeapp.services.infos', [])


.factory('Infos', function(
		$localstorage,
		$rootScope,
		$ImageCacheFactory
		) {

  var items_en = [
   {  id: 1,
      tags: ["poi", "gps"],
	  category: "location",
      title: 'My current position on Google Maps',
	  description: "Select the link below to view your current position on the Google Maps. Select 'Directions' for wayfinding.",
	  image: 'currentpos.png',
	  contact: {
		  url: "https://www.google.at/maps/",
	   },
	  notes:  '<b>Please</b> use this <a href="#openstreetmap">link</a> to get further information about the other routing services in Austria.'
   },
   {  id: 10,
      tags: ["poi", "routing", "gps"],
	   category: "location",
      title: 'Way to the nearest refugee camp in Styria',
	  image: 'waytocamp.png',
	   notes:  'Routing information can be activated via <a href="https://openstreetmap.com/current">OpenStreetmap</a>'
   },
   {  id: 12,
      tags: ["education"],
	  category: "language",
	  title: 'German Courses at KF-Uni Graz',
	  description: "You can contact the international office for dates about free german courses.",
	  descriptionHtml: "You can contact the <a href='#intoffice'>International Office</a> for dates about free german courses.", 
      image: "language.png",
	   contact: {
		   person: null,
		   long: 47.07,
		   lat: 15.4,
		   street: "Elisabethstraße 45",
		   zip: "8020",
		   city: "Graz",
		   tel: "+43 316 99887766",
		   email: "office@kfunigraz.at",
		   url: "http://www.kfunigraz.at/germancourses",
		   hours: "0-24h"
	   },
	  notes:  '<b>Please</b> use this <a href="#back">link</a> to get further information about the Austrian Language Card.',
   },
   {  id: 14,
      tags: ["translation"],
	  category: "language",
      title: 'Translation',
      image: 'translation.png',
	   notes:  'Frequently used words: <ul><li>Bitte | Please</li><li>Danke | Thank You</li><li>Auf Wiedersehen | Good Bye</li></ul>',
   },
   {  id: 17,
      tags: ["emergency"],
	   category: "medi",
      title: 'Unfallkrankenhaus Graz',
	   description: "For injuries drive to UKH, the Unfallkrankenhaus Graz. In this hospital wounds and broken bones are treated.",
      image: 'med.png',
	   contact: {
		   person: null,
		   long: 47.07,
		   lat: 15.4,
		   street: "Elisabethstraße 45",
		   zip: "8020",
		   city: "Graz",
		   tel: "+43 316 99887766",
		   email: "ukh@graz.at",
		   url: "https://ukh.graz.ac.at",
		   hours: "0-24h"
	   },
	  notes:  '<b>Please</b> use this <a href="#back">link</a> to get further information about the Austrian eCard.',
    },
  
  
    {  id: 27,
       tags: ["trash"],
		category: "culture",
       title: 'Deposit of trash',
 	   description: "In Austria, strict separation  trash is done for optimising reuse of materials.",
       image: 'trash.jpeg',
 	   notes:  '<b>Please</b> use the <a href="#back">provided Trash-Bins</a> to help sorting trash for later reuse.',
     },
  
  
  
  ];





  var items_de = [
   {  id: 1,
      tags: ["poi"],
	   category: "location",
      title: 'Mein aktueller Standort.',
	   description: 'Meinen aktueller Standpunkt in Google Maps anzeigen',
	  image: 'currentpos.png',
   },
   {  id: 10,
      tags: ["poi"],
	   category: "location",
      title: 'Flüchtlingszentrum Stmk.',
	   description: 'Wie komme ich ins nächstgelegene Flüchtlingszentrum in der Steiermark.',
	  image: 'waytocamp.png',
	   notes:  '<div>Routenberechnungensind auch via <a href="www.openstreetmap.org">OpenStreetmap</a> möglich</div>', 
   },
   {  id: 12,
      tags: ["language"],
	   category: "language",
      title: 'Deutschkurse an der KF Uni Graz',
	  description: "Bitte kontaktieren Sie das International Office für Informationen über die nächsten Termine für die Deutschkurse.",
	  descriptionHtml: "Bitte kontaktieren Sie das <a href='#intoffice'>International Office</a> für die nächtsten Termine der Deutschkurse", 
      image: "language.png",
	   contact: {
		   person: null,
		   long: 47.07,
		   lat: 15.4,
		   street: "Elisabethstraße 45",
		   zip: "8020",
		   city: "Graz",
		   tel: "+43 316 99887766",
		   email: "office@kfunigraz.at",
		   url: "http://www.kfunigraz.at/deutschkurse",
		   hours: "0-24h"
	   },
	  notes:  '<b>Bitte</b> klicken Sie auf folgenden <a href="#back">Link</a>, um weitere Informationen bezüglich der Austrian Language Card zu erhalten.',
    },
    {  id: 14,
       tags: ["translation"],
		category: "language",
       title: 'Übersetzungen',
       image: 'translation.png',
	   notes:  'Liste von häufig benutzten Übersetzungen: <ul><li>Bitte | Please</li><li>Danke | Thank You</li><li>Auf Wiedersehen | Good Bye</li></ul>',
    },
    {  id: 17,
       tags: ["emergency"],
		category: "medi",
       title: 'Unfallkrankenhaus Graz',
       image: 'med.png',
 	   contact: {
 		   person: null,
 		   long: 47.07,
 		   lat: 15.4,
 		   street: "Elisabethstraße 45",
 		   zip: "8020",
 		   city: "Graz",
 		   tel: "+43 316 99887766",
 		   email: "ukh@graz.at",
 		   url: "https://ukh.graz.ac.at",
 		   hours: "0-24h",
 	   },
 	  notes:  '<b>Folgen</b> Sie diesem <a href="#back">Link</a> um weitere Informationen über die österreichische eCard zu erhalten.',

    },
	
	
    {  id: 27,
       tags: ["trash"],
		category: "culture",
       title: 'Müll',
 	   description: "Müllvermeidung und Mülltrennung unterstützt bestmögliche Wiederverwendung der Materialen.",
       image: 'trash.jpeg',
 	   notes:  '<b>Bitte</b> die vorgesehenen <a href="#back">Müllcontainer</a> benutzen, um die Wiederverwendung von wertvollen Stoffen wie Papier und Glas optimal zu unterstützen.',
     },
	

  ];
	
  // load the data from the cache in local storage, or use the one listed above:
  // var itemDict = $localstorage.getObject('InfoMessagesCache') || {
	var itemDict =  {
		  "de": items_de,
		  "en": items_en
	}
	// replace the defaults, if we have some stored in local database
	var cachedMessage = $localstorage.getObject('InfoMessagesCache')
	if (Object.keys(cachedMessage).length > 0) {
		itemDict = cachedMessage
	}
	
	// we do not know default language here ($translate.use())
	// => we expect someone to call setLanguageKey !
	var currLangKey="";
	var items = []; 
  return {
	refreshTheDataAfterDownload: function(infoMessages){ // after download = after "pull-refresh"		
		var newInfoDict={} // we will completly replace all the existing data
		var listOfImagesToCache=[]
		infoMessages.forEach(function(itm){
			// mapping if attributes are different on server:
			itm.category = itm.cat
			
			console.log("create List for the itm: "+JSON.stringify(itm))
			console.log("create List for the id: "+itm.id)
			console.log("create List for the title: "+itm.title)
			console.log("create List for the lang: "+itm.lang)
			if (! newInfoDict[itm.lang] ){ // create list per language inside dict
				console.log("create List for the language: "+itm.lang)
				newInfoDict[itm.lang]=[]
			}
			// TODO:
			// if an image file does not exist locally, we might download (and cache it now):
			
			console.log("We check if image '"+itm.image+"' is available:")
			// // TODO: preload images into FILE SYSTEM (for offline usage) !!!
			// CF.checkFile("/img/infos/",itm.image).then(
			// 	function (success) {	// success
			// 		console.log(" => available = ",success)
			//       	  		}, function (error) {	// error
			// 		console.log(" => ERROR = ",error)
			//       	  		});
			// //
			
			// PRE-LOADING images:
			listOfImagesToCache.push($rootScope.CONFIG.apiUrl +"/thumbs/"+itm.image)

			newInfoDict[itm.lang].push(itm)
		})
		$ImageCacheFactory.Cache(listOfImagesToCache);
		console.log("=> All the en-infos: " + JSON.stringify(newInfoDict["en"]) )
		console.log("=> All the de-infos: " + JSON.stringify(newInfoDict["de"]) )
	  	
	
	 $localstorage.setObject('InfoMessagesCache', newInfoDict )
		
	  console.log("DEBUG-INFOS: got new info-item-dictionary, so we refresh all the items")
	  itemDict = newInfoDict
  	  items = itemDict[ currLangKey ]; 
	},
	setLanguageKey: function(lang_key){
	  console.log("DEBUG-INFOS: changing currLangKey to "+lang_key)
	  currLangKey =lang_key
	  items = itemDict[ currLangKey ]; 
	},
    all: function() {
	  console.log("we return the items for lang="+currLangKey )
	  return items
    },
    remove: function(item) { // TODO i18n
      items.splice(items.indexOf(item), 1);
    },
    get: function(itemId) { // TODO: i18n
	  console.log(" we search for item with id: "+itemId+" in items: " + items)
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(itemId)) {
          return items[i];
        }
      }
      return null;
    },

	
	// we search case-insensitive inside the title and the descriptions:
	searchFulltext: function(query){
		console.log("TODO implement/improve the search for query '"+query+"' in "+items)
		foundItems=[];
		var re = new RegExp(query,"i")
		items.forEach(function(item){
			if (item.title && item.title.match( re ) ){ 
				foundItems.push(item);
			}else if (item.description && item.description.match( re ) ){ 
				foundItems.push(item);
			}
		});
		return foundItems;
	}
  };
})

;