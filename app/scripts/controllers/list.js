'use strict';

/**
 * @ngdoc function
 * @name app.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ListCtrl', function ($scope, $routeParams, RedditService) {
    $scope.name = $routeParams.param;

    $scope.getHot = function() {
      RedditService.getHot($scope.name).then(function(val) {
          $scope.posts = val.data.children;
        }
      );
    };
    $scope.getTop = function() {
      RedditService.getTop($scope.name).then(function(val) {
          $scope.posts = val.data.children;
        }
      );
    };
    $scope.getNew = function() {
      RedditService.getNew($scope.name).then(function(val) {
          $scope.posts = val.data.children;
        }
      );
    };

    $scope.getControversial = function() {
      RedditService.getControversial($scope.name).then(function(val) {
          $scope.posts = val.data.children;
        }
      );
    };

    $scope.getHot();
    $scope.formatDate = function(ticks) {
      return new Date(ticks).toUTCString();
    }
  });
