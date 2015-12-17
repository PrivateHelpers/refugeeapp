/* global angular, console */
angular.module('refugeeapp')
 
    .directive('singleresult', function () {
        "use strict";
 
        return {
            restrict: 'E',
            scope: {
                info: '=data'
            },
            link: function (scope, element, attrs) {
                scope.browse = function (url) {
                    console.log('opening link: '+url);
                    window.open(url, '_blank', 'location=yes');
                };
            },
            template: '<a class="item item-thumbnail-left item-text-wrap" '+
				'ng-click="browse(info.url)">' +
                '<img ng-src="{{info.image}}">' +
                '<h2>{{info.name}}</h2>'+
				'<p>{{info.tags}}</p></a>'
        };
    })
;