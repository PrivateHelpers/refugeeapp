angular.module('refugeeapp.services',[])


// Offers = Items:
.factory('Items', function(
		$localstorage,
		$rootScope,
		$ImageCacheFactory
	) {

  var items_en = [{
    id: 770,
	isLocal: true, // isLocal true for local images (provided with the app, not downloaded!)
    my: false,
    title: 'German Course',
    description: 'Graz: Cheap German Courses at Universitätsviertel',
    image: 'course.jpg',
  	contact: {
  		email: "ori@arelio.de",
  		person: "English / German Teacher",
  		street: "Hauptstraße 34",
  		zip: "8320",
  		city: "Weiz",
  		long: 45, lat:19,
  	}, notes:"This course is level C1 and a short intro exam has to be taken on 28. Februar 2016 at the given location.",
  }, 
  {
    id: 771,
	isLocal: true,
	my: false,
    title: 'Shoes for Men',
    description: 'Eight pairs of schoes from size 41 to size 43. Color: Black.',
    image: 'shoe.png',
	contact: {
		email: "office@shoe.co.at",
		tel: "+43 316 99887766",
		person: "Sportwart",
		street: "Reinfeldgasse 17b",
		zip: "8020",
		city: "Graz",
		long: 44, lat:17,
		hours: "Please fetch Mo to Fr from 11:00 to 14:00"
	}, notes:"Valid until 12. Jannuar 2016.",
	
  },
  {
      id: 7711,
	  isLocal: true,
      my: true,
      title: 'Translation to German',
      description: 'I can offer free translation from Farsi to German.',
      image: 'translation.png',
  	contact: {
  		email: "trans@lation.co.at",
  		zip: "8020",
  		city: "Graz",
  		long: 44, lat:17,
		person: "Abi Kula",
  	}, 
	
    },
  {
      id: 7731,
	  isLocal: true,
      my: false,
      title: 'Stories for Kids',
      description: 'I can offer reading German stories to your kids.',
      image: 'translation.png',
  	contact: {
  		tel: "+43 316 08150815",
  		person: "Dr. Kurt",
  		city: "Wildon",
  		hours: "About 11:00"
  	}, 
	notes:"Valid until End of Feb 2016.",
    
	}

];

    var items_de = [{
      id: 770,
	  isLocal: true,
      my: false,
      title: 'Deutschkurs',
      description: 'Günstiger Deutschkurs im Univiertel Graz.',
      image: 'course.jpg',
	  	contact: {
	  		email: "ori@arelio.de",
	  		person: "English / German Teacher",
	  		street: "Hauptstraße 34",
	  		zip: "8320",
	  		city: "Weiz",
	  		long: 45, lat:19,
	  	}, 
		notes:"Deutsch mit dem Niveau von Level C1. Ein Einstufungstest ist nötig. Dieser ist am 28. Februar 2016 zu absolvieren.",

    }, {
      id: 771,
	  isLocal: true,
      my: false,
      title: 'Männerschuhe',
      description: 'Schwarze Männerschuhe der Größen 41 vis 43 gratis abzugeben. Bitte um Abholung von 9 bis 13 Uhr am Treffpunkt in Graz. Angebot gültig bis 16. Jänner 2016.',
      image: 'shoe.png',
		contact: {
			email: "office@shoe.co.at",
			tel: "+43 316 99887766",
			person: "Sportwart",
			street: "Reinfeldgasse 17b",
			zip: "8020",
			city: "Graz",
			long: 44, lat:17,
			 hours: "Abzuholen Mo bis Fr von 11:00 bis 14:00 Uhr"
		}, notes:"Angebot gültig bis 12. Jänner 2016.",
    },
    {
        id: 7711,
		isLocal: true,
        my: true,
        title: 'Übersetzungen',
        description: 'Biete gratis Übersetzung von Farsi ins Deutsche. Diese Angebot gilt für den Bezirk Mureck.',
        image: 'translation.png',
  	contact: {
		person: "Abi Kula",
  		email: "trans@lation.co.at",
  		zip: "8020",
  		city: "Graz",
  		long: 44, lat:17,
  	}, 
    },
    {
        id: 7731,
		isLocal: true,
        my: false,
        title: 'Kindern vorlesen',
        description: 'Ich biete an, Ihren Kindern Geschichten auf Deutsch vorzulesen. Großraum Graz.',
        image: 'translation.png',
  	contact: {
  		tel: "+43 316 08150815",
  		person: "Dr. Kurt",
  		city: "Wildon",
  		hours: "Anzurufen ab 11:00"
  	}, 
	notes:"Bis Ende Feb 2016 würde ich zur Verfügung stehen.",
      }
  	];
	
	var itemDict={
		  "de": items_de,
		  "en": items_en
	};
	
	// we do not know default language here ($translate.use())
	// => we expect someone to call setLanguageKey !
	var currLangKey="";
	var items = []; 

  return {
	refreshTheDataAfterDownload: function(downloadedItems){ // after download = after "pull-refresh"		
	  	console.log("UPDATE the goods = items: " + JSON.stringify(downloadedItems) )
		  
  		var newItemsDict={} // we will completly replace all the existing data
  		var listOfItemsToCache=[]
  		downloadedItems.forEach(function(itm){
  			// mapping if attributes are different on server:
  			itm.language = itm.lang
			itm.image = itm.img
			
  			if (! newItemsDict[itm.lang] ){ // create list per language inside dict
  				console.log("create List for the language: "+itm.lang)
  				newItemsDict[itm.lang]=[]
  			}
  			// TODO:
  			// if an image file does not exist locally, we might download (and cache it now):
			
  			console.log(" TODO: We check if image '"+itm.image+"' is available (TODO: cache in local filesystem):")
  			// // TODO: preload images into FILE SYSTEM (for offline usage) !!!
  			// CF.checkFile("/img/infos/",itm.image).then(
  			// 	function (success) {	// success
  			// 		console.log(" => available = ",success)
  			//       	  		}, function (error) {	// error
  			// 		console.log(" => ERROR = ",error)
  			//       	  		});
  			// //
			
  			// PRE-LOADING images:
  			listOfItemsToCache.push($rootScope.CONFIG.apiUrl +"/thumbs/"+itm.image)

  			newItemsDict[itm.lang].push(itm)
  		})
  		$ImageCacheFactory.Cache(listOfItemsToCache);
  		console.log("=> All the en-infos: " + JSON.stringify(newItemsDict["en"]) )
  		console.log("=> All the de-infos: " + JSON.stringify(newItemsDict["de"]) )
	  	
		$localstorage.setObject('GoodItemsCache', newItemsDict )
		console.log("DEBUG-INFOS: got new info-item-dictionary, so we refresh all the offered good-items")
  	    itemDict = newItemsDict
   	    items = itemDict[ currLangKey ];   
	}, 

	setLanguageKey: function(lang_key){
	  console.log("DEBUG-ITEMS: changing currLangKey to "+lang_key)
	  currLangKey =lang_key // we change the object currLang 
	  items = itemDict[ currLangKey ]; 
	  console.log("DEBUG-ITEMS: so we reset the items: ",items)
	},
    all: function() {
	  console.log("we return the items for lang="+currLangKey )
	  return items
    },
    remove: function(item) { 
      items.splice(items.indexOf(item), 1);
    },
    get: function(itemId) { 
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(itemId)) {
          return items[i];
        } // if
      } // for
      return null;
    } // function get
  }; // return
}) // factory function


;