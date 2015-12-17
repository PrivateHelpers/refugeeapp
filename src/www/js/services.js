angular.module('refugeeapp.services', [])


.factory('Items', function() {

  var items_en = [{
    id: 0,
    my: false,
    name: 'German Course',
    lastText: 'Graz Jan 2016 German Course at ...',
    face: 'img/course.jpg'
  }, {
    id: 1,
    my: false,
    name: 'Shoes for Men',
    lastText: 'Eight pairs of schoes from size 41 to size 43. Color: Black. Please fetch 9:00 - 13:00 at main meeting center in Graz befor Jan 12 2016',
    face: 'img/shoe.png'
  },
  {
      id: 11,
      my: true,
      name: 'Translation to German',
      lastText: 'I can offer free translation from Farsi to German.',
      face: 'img/translation.png'
    }];

    var items_de = [{
      id: 0,
      my: false,
      name: 'Deutschkurs',
      lastText: 'Ab 14. Jänner in Graz. Deutschkurs an der Karl-Franzens Uni. Bitte melden Sie sich unter der Tel-Nr. 0998 1234 bis zum 3. Jänner 2016 an.',
      face: 'img/course.jpg'
    }, {
      id: 1,
      my: false,
      name: 'Männerschuhe',
      lastText: 'Schwarze Männerschuhe der Größen 41 vis 43 gratis abzugeben. Bitte um Abholung von 9 bis 13 Uhr am Treffpunkt in Graz. Angebot gültig bis 16. Jänner 2016.',
      face: 'img/shoe.png'
    },
    {
        id: 11,
        my: true,
        name: 'Übersetzungen',
        lastText: 'Biete gratis Übersetzung von Farsi ins Deutsche. Diese Angebot gilt für den Bezirk Mureck.',
        face: 'img/translation.png'
    },
  
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
   {  id: 10,
      top: true,
      topStars: "* * *",
   	  lastWeek: true,
	  timestamp: "Today 9:03",
      name: 'Landeskrankenhaus in Graz',
   },
   {  id: 11,
      top: true,
      topStars: "* * *",
	  lastWeek: true,
	  timestamp: "Today 9:07",
      name: 'German Courses in Austria (Dates)',
    },
    { id: 17,
      top: false,
      topStars: "* *",
 	  lastWeek: true,
	  timestamp: "Today 9:11",
      name: 'Translations (from/to Englisch)',
     },
    {  id: 12,
       top: false,
      topStars: "* * *",
 	  lastWeek: true,
	  timestamp: "Today 9:13",
       name: 'Take me to the nearest camp',
     }
  ];
  var items_de = [
    {  id: 10,
       top: true,
      topStars: "* * *",
       topStars: "* * *",
       lastWeek: true,
	   timestamp: "Today 9:03",
       name: 'Landeskrankenhaus in Graz',
    },
    { id: 11,
      top: true,
      topStars: "* * *",
      lastWeek: true,
	  timestamp: "Today 9:07",
      name: 'Deutschkurse inklusive Datum und Zeit',
    },
    { id: 17,
      top: false,
      topStars: "* *",
 	  lastWeek: true,
	  timestamp: "Today 9:11",
      name: 'Übersetzungen (von/nach Englisch)',
    },
    { id: 12,
      top: false,
      topStars: "* * *",
 	  lastWeek: true,
	  timestamp: "Today 9:13",
      name: 'Zum nächsten Zentrum',
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
    all: function() {
	  console.log("we return the items for lang="+currLangKey )
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
