'use strict';

/**
 * @ngdoc function
 * @name app.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ArticleCtrl', function ($scope, $routeParams, RedditService) {
    $scope.article = $routeParams.article;
    $scope.name = $routeParams.name;
    $scope.getComments = function() {
      RedditService.getComments($scope.name, $scope.article).then(function(val) {
          $scope.comments = val;
        }
      );
    };

    $scope.getComments();
    $scope.formatDate = function(ticks) {
      return new Date(ticks).toUTCString();
    }
  });
