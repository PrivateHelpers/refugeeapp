angular.module('refugeeapp.services.infos', [])


.factory('Infos', function() {

  var items_en = [
   {  id: 1,
      tags: ["location"],
      name: 'My current position on Google Maps',
	  description: "Select the link below to view your current position on the Google Maps. Select 'Directions' for wayfinding.",
	  image: 'img/info/currentpos.png',
	  contact: {
		  url: "https://www.google.at/maps/",
	   },
	  notes:  '<b>Please</b> use this <a href="#openstreetmap">link</a> to get further information about the other routing services in Austria.'
   },
   {  id: 10,
      tags: ["location"],
      name: 'Way to the nearest refugee camp in Styria',
	  icon: "ion-home",
	  image: 'img/info/waytocamp.png',
   },
   {  id: 12,
      tags: ["language"],
	  name: 'German Courses at KF-Uni Graz',
	  description: "You can contact the international office for dates about free german courses.",
	  descriptionHtml: "You can contact the <a href='#intoffice'>International Office</a> for dates about free german courses.", 
      image: "img/info/language.png",
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
      tags: ["language"],
      name: 'Translation',
      icon: "ion-home",
      image: 'img/info/translation.png',
   },
   {  id: 17,
      tags: ["medi"],
      name: 'Doctors Hospitals',
      icon: "ion-home",
      image: 'img/info/med.png',
   },
  ];
  var items_de = [
   {  id: 1,
      tags: ["location"],
      name: 'Mein aktueller Standpunkt...',
	  icon: 'ion-location', 
      image: 'img/info/currentpos.png',
   },
   {  id: 10,
      tags: ["location"],
      name: 'Wie komme ich ins nächstgelegene...', // Flüchtlingszentrum in der Steiermark.',
	  icon: "ion-home",
      image: 'img/info/waytocamp.png',
   },
   {  id: 12,
      tags: ["language"],
      name: 'Deutschkurse an der KF Uni Graz',
	  description: "Bitte kontaktieren Sie das International Office für Informationen über die nächsten Termine für die Deutschkurse.",
	  descriptionHtml: "Bitte kontaktieren Sie das <a href='#intoffice'>International Office</a> für die nächtsten Termine der Deutschkurse", 
      image: "img/info/language.png",
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
       tags: ["language"],
       name: 'Übersetzungen',
       icon: "ion-home",
       image: 'img/info/translation.png',
    },
    {  id: 17,
       tags: ["medi"],
       name: 'Ärzte und Spitäler',
       icon: "ion-home",
       image: 'img/info/med.png',
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
	  console.log("DEBUG-INFOS: changing currLangKey to "+lang_key)
	  currLangKey =lang_key // we change the object currLang 
	  items = itemDict[ currLangKey ]; 
	  console.log("DEBUG-INFOS: so we reset the items: ",items)
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
	searchByTag: function(tag){
		console.log("TODO implement a search for tag '"+tag+"'")
		foundItems=[];
		items.forEach(function(item){
			if (item.tags[0] == tag){ foundItems.push(item);}
		});
	  console.log("TODO implement a search for tag => items: "+foundItems)
	  return foundItems;
	}
  };
})

;