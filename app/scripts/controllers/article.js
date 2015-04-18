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
          $scope.post = val[0].data.children[0].data;
          $scope.comments = [];
          var comment;
          angular.forEach(val[1].data.children, function(value) {
            comment = value.data;
            comment.replies = value.data.replies && value.data.replies.data.children;
            $scope.comments.push(comment);
          });
        }
      );
    };

    $scope.getComments();
    $scope.formatDate = function(ticks) {
      return new Date(ticks).toUTCString();
    }
  });
