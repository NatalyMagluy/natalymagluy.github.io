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

    $scope.cachesCleared = false;

    $scope.clearCache = function() {
      $scope.cachesCleared = false;
      sendMessage({
        command: 'delete'
      }).then(function() {
        $scope.cachesCleared = true;
        $scope.$apply();
        console.log('cleared');
      });
    };

    function sendMessage(message) {
      return new Promise(function(resolve, reject) {
        var messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function(event) {
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data);
          }
        };

        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
      });
    }

  });
