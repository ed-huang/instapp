'use strict';

/**
 * @ngdoc function
 * @name instagramApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instagramApp
 */
angular.module('instagramApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
