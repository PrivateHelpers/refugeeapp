angular.module('refugeeapp.services.infos', [])


.factory('Infos', function() {

  var items_en = [
   {  id: 1,
      tags: ["poi", "gps"],
	  category: "location",
      title: 'My current position on Google Maps',
	  description: "Select the link below to view your current position on the Google Maps. Select 'Directions' for wayfinding.",
	  image: 'img/info/currentpos.png',
	  contact: {
		  url: "https://www.google.at/maps/",
	   },
	  notes:  '<b>Please</b> use this <a href="#openstreetmap">link</a> to get further information about the other routing services in Austria.'
   },
   {  id: 10,
      tags: ["poi", "routing", "gps"],
	   category: "location",
      title: 'Way to the nearest refugee camp in Styria',
	  image: 'img/info/waytocamp.png',
	   notes:  'Routing information can be activated via <a href="https://openstreetmap.com/current">OpenStreetmap</a>'
   },
   {  id: 12,
      tags: ["education"],
	  category: "language",
	  title: 'German Courses at KF-Uni Graz',
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
      tags: ["translation"],
	  category: "language",
      title: 'Translation',
      image: 'img/info/translation.png',
	   notes:  'Frequently used words: <ul><li>Bitte | Please</li><li>Danke | Thank You</li><li>Auf Wiedersehen | Good Bye</li></ul>',
   },
   {  id: 17,
      tags: ["emergency"],
	   category: "medi",
      title: 'Unfallkrankenhaus Graz',
	   description: "For injuries drive to UKH, the Unfallkrankenhaus Graz. In this hospital wounds and broken bones are treated.",
      image: 'img/info/med.png',
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
       image: 'img/info/trash.jpeg',
 	   notes:  '<b>Please</b> use the <a href="#back">provided Trash-Bins</a> to help sorting trash for later reuse.',
     },
  
  
  
  ];





  var items_de = [
   {  id: 1,
      tags: ["poi"],
	   category: "location",
      title: 'Mein aktueller Standort.',
	   description: 'Meinen aktueller Standpunkt in Google Maps anzeigen',
	  image: 'img/info/currentpos.png',
   },
   {  id: 10,
      tags: ["poi"],
	   category: "location",
      title: 'Flüchtlingszentrum Stmk.',
	   description: 'Wie komme ich ins nächstgelegene Flüchtlingszentrum in der Steiermark.',
	  image: 'img/info/waytocamp.png',
	   notes:  '<div>Routenberechnungensind auch via <a href="www.openstreetmap.org">OpenStreetmap</a> möglich</div>', 
   },
   {  id: 12,
      tags: ["language"],
	   category: "language",
      title: 'Deutschkurse an der KF Uni Graz',
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
       tags: ["translation"],
		category: "language",
       title: 'Übersetzungen',
       image: 'img/info/translation.png',
	   notes:  'Liste von häufig benutzten Übersetzungen: <ul><li>Bitte | Please</li><li>Danke | Thank You</li><li>Auf Wiedersehen | Good Bye</li></ul>',
    },
    {  id: 17,
       tags: ["emergency"],
		category: "medi",
       title: 'Unfallkrankenhaus Graz',
       image: 'img/info/med.png',
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
       image: 'img/info/trash.jpeg',
 	   notes:  '<b>Bitte</b> die vorgesehenen <a href="#back">Müllcontainer</a> benutzen, um die Wiederverwendung von wertvollen Stoffen wie Papier und Glas optimal zu unterstützen.',
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