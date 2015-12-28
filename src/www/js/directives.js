/*  
	this part creates a small html snippet 
	for the search results
*/
angular.module('refugeeapp')
 
    .directive('singleresult', function () {
        "use strict";
 
        return {
            restrict: 'E',
            scope: {
                info: '=data'
            },
            link: function (scope, element, attrs) {
				// not used at the moment:
				// open external url direct from search results
                scope.browse = function (url) {
                    console.log('opening link: '+url);
                    window.open(url, '_blank', 'location=yes');
                };

            },
            template: '<a class="item item-thumbnail-left item-text-wrap" '+
				'href="#/tab/infos/{{info.id}}">' +
                '<img ng-src="{{info.image}}">' +
                '<h2>{{info.title}}</h2>'+
				'<p>{{info.description}}</p></a>'
        };
    })
;