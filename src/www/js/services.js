angular.module('refugeeapp.services', [])


.factory('Items', function() {

  var items_en = [{
    id: 770,
    my: false,
    title: 'German Course',
    description: 'Graz: Cheap German Courses at Universitätsviertel',
    image: 'img/offers/course.jpg',
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
    my: false,
    title: 'Shoes for Men',
    description: 'Eight pairs of schoes from size 41 to size 43. Color: Black.',
    image: 'img/offers/shoe.png',
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
      my: true,
      title: 'Translation to German',
      description: 'I can offer free translation from Farsi to German.',
      image: 'img/offers/translation.png',
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
      my: false,
      title: 'Stories for Kids',
      description: 'I can offer reading German stories to your kids.',
      image: 'img/offers/translation.png',
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
      my: false,
      title: 'Deutschkurs',
      description: 'Günstiger Deutschkurs im Univiertel Graz.',
      image: 'img/offers/course.jpg',
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
      my: false,
      title: 'Männerschuhe',
      description: 'Schwarze Männerschuhe der Größen 41 vis 43 gratis abzugeben. Bitte um Abholung von 9 bis 13 Uhr am Treffpunkt in Graz. Angebot gültig bis 16. Jänner 2016.',
      image: 'img/offers/shoe.png',
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
        my: true,
        title: 'Übersetzungen',
        description: 'Biete gratis Übersetzung von Farsi ins Deutsche. Diese Angebot gilt für den Bezirk Mureck.',
        image: 'img/offers/translation.png',
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
        my: false,
        title: 'Kindern vorlesen',
        description: 'Ich biete an, Ihren Kindern Geschichten auf Deutsch vorzulesen. Großraum Graz.',
        image: 'img/offers/translation.png',
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
        }
      }
      return null;
    }
  };
})


.factory('Favorites', function() {

  var items_en = [
   {  id: 9910,
      top: true,
      topStars: "* * *",
   	  lastWeek: true,
	  timestamp: "Today 9:03",
	  itemId: 17,
      //title: 'Landeskrankenhaus in Graz',
   },
   {  id: 9911,
      top: true,
      topStars: "* * *",
	  lastWeek: true,
	  timestamp: "Today 9:07",
	   itemId: 12,
      //title: 'German Courses in Austria (Dates)',
    },
    { id: 9917,
      top: false,
      topStars: "* *",
 	  lastWeek: true,
	  timestamp: "Today 9:11",
		itemId: 14,
      //title: 'Translations (from/to Englisch)',
     },
    {  id: 9912,
       top: false,
      topStars: "* * *",
 	  lastWeek: true,
	  timestamp: "Today 9:13",
		itemId: 10,
      // title: 'Take me to the nearest camp',
     }
  ];
  var items_de = [
    {  id: 9910,
       top: true,
       topStars: "* * *",
       lastWeek: true,
	   timestamp: "Today 9:03",
	   itemId: 17,
       //title: 'Landeskrankenhaus in Graz',
    },
    { id: 9911,
      top: true,
      topStars: "* * *",
      lastWeek: true,
	  timestamp: "Today 9:07",
      itemId: 12,
	  //title: 'Deutschkurse inklusive Datum und Zeit',
    },
    { id: 9917,
      top: false,
      topStars: "* *",
 	  lastWeek: true,
	  timestamp: "Today 9:11",
		itemId: 14,
      //title: 'Übersetzungen (von/nach Englisch)',
    },
    { id: 9912,
      top: false,
      topStars: "* * *",
 	  lastWeek: true,
	  timestamp: "Today 9:13",
		itemId: 10,
      //title: 'Zum nächsten Zentrum',
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
	setLanguageKey: function(lang_key){
	  console.log("DEBUG-Favorites: changing currLangKey to "+lang_key)
	  currLangKey =lang_key // we change the object currLang 
	  items = itemDict[ currLangKey ]; 
	  console.log("DEBUG-Favorites: so we reset the items: ",items)
	},
    all: function(infos) {
	  console.log("we return the items for lang="+currLangKey )
		items.forEach(function(itm){
			console.log("TODO: fetch details about this item with id="+itm.itemId)
			var currInfo=infos.get(itm.itemId)
			if (currInfo){
				console.log( " => RESET: from " +itm.name+" to "+ currInfo.name)
				itm.name=currInfo.name
			} 
		});
	  return items
    },
    remove: function(item) { // TODO i18n
      items.splice(items.indexOf(item), 1);
    },
    get: function(favoriteId) { // TODO: i18n
	  
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(favoriteId)) {
          return items[i];
        }
      }
      return null;
    }
  };
})




// TODO: add more demo data

;
