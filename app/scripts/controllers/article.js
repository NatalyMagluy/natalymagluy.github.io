'use strict';

/**
 * @ngdoc function
 * @name app.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ArticleCtrl', function ($scope, $routeParams, RedditService, TimeFormatterService) {
    $scope.article = $routeParams.article;
    $scope.name = $routeParams.name;
    $scope.getComments = function() {
      RedditService.comments($scope.article, $scope.name).sort("hot").fetch(function(val) {
          $scope.post = val[0].data.children[0].data;
          $scope.comments = [];
          var comment;
          angular.forEach(val[1].data.children, function(value) {
            comment = value.data;
            comment.replies = value.data.replies && value.data.replies.data.children;
            $scope.comments.push(comment);
          });
          $scope.$apply();
        }
      );
    };

    $scope.getComments();
    $scope.formatDate = TimeFormatterService.timeSince;
  });
