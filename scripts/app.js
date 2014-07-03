'use strict';

/**
 * @ngdoc overview
 * @name instagramApp
 * @description
 * # instagramApp
 *
 * Main module of the application.
 */
angular
  .module('instagramApp', ['ngAnimate'])

//Animations
  .animation('.repeat-item',
  ['$timeout', function($timeout) {

  var queue = {
    enter : [], leave : []
  };
  function queueAnimation(event, delay, fn) {
    var timeouts = [];
    var index = queue[event].length;
    queue[event].push(fn);
    queue[event].timer && $timeout.cancel(queue[event].timer);
    queue[event].timer = $timeout(function() {
      angular.forEach(queue[event], function(fn, index) {
        timeouts[index] = $timeout(fn, index * delay * 1000, false);
      });
      queue[event] = [];
    }, 10, false);

    return function() {
      if(timeouts[index]) {
        $timeout.cancel(timeouts[index]);
      } else {
        queue[index] = angular.noop;
      }
    }
  };

  return {
    enter : function(element, done) {
    	console.log('enter')

      element = $(element[0]);
      var cancel = queueAnimation('enter', 0.2, function() {
        element.css({opacity : 0, 'margin-top': '-100%'});
        element.animate({opacity : 1, 'margin-top': '0'}, done);
        var cancelFn = cancel;
        cancel = function() {
          cancelFn();
          element.stop();
          element.css({ opacity : 0});
        };
      }); 
      return function onClose(cancelled) {
        cancelled && cancel();
      };
    },
    leave : function(element, done) {
    	console.log("leave");
      element = $(element[0]);
      var cancel = queueAnimation('leave', 0.2, function() {
        element.css({ opacity : 0 });
        element.animate({ opacity : 1, duration: 1000 }, done);
        var cancelFn = cancel;
        cancel = function() {
          cancelFn();
          element.stop();
          //no point in animating a removed element
        };
      }); 
      return function onClose(cancelled) {
        cancelled && cancel();
      };
    }
  }
}])

//Controller
  .controller('inputCtrl', function($scope, $http) {
  	$scope.submitTag = function() {

//My Variables
		var tag = $scope.data.tagSearch;
  		var url = "https://api.instagram.com/v1/tags/"+tag+"/media/recent";
  		var myId = "7179f77761ce4e1086daa3662bb621c2";
  		console.log($scope.data);

//HTTP  
		if($scope.myForm.$valid) {
      		console.log('The form is valid');
      		$scope.message = "Searching Instagram for "+tag;
      		$http({
	            method: 'JSONP',
	            url: url,
	            params: {
	            	callback: 'JSON_CALLBACK',
					client_id: myId
				}
	        }).
	        success(function(response) {
	            $scope.results = response.data;
	            $scope.message = "We found "+$scope.results.length+" results for \x22"+tag+"\x22";
	            console.log(response.data);
	            
	        }).
	        error(function() {
	            alert('error');
	        })
    	} else {
    	}
        
  	}
  });
