'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.go = function() {
      if(!$scope.name) {
        return;
      }
      $location.url('/r/' + $scope.name);
    };

    $scope.keyupHandler = function(event) {
      if(event.keyCode === 13) {
        $scope.go();
      }
    };
  });
