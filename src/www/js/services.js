angular.module('refugeeapp.services', [])


.factory('Items', function() {

  var items = [{
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

  return {
    all: function() {
      return items;
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

// add more demo data

;
