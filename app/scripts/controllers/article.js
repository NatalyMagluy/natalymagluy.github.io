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
      //TODO: find way to get all comments
      RedditService.comments($scope.article, $scope.name).limit(500).sort("hot").fetch(function(val) {
          $scope.post = val[0].data.children[0].data;
          $scope.comments = [];
          var comment;
          angular.forEach(val[1].data.children, function(value) {
            comment = value.data;
            comment.replies = value.data.replies && traverseReplies(value.data.replies.data.children);
            $scope.comments.push(comment);
          });
          $scope.$apply();
        }
      );
    };

    function traverseReplies(replies, level) {
      var comments = [];
      level = level || 0;
      var obj;
      for(var i = 0; i < replies.length; i++) {
        obj = replies[i];
        obj.level = level;
        comments.push(obj);
        if (obj.data.replies) {
          angular.forEach(traverseReplies(obj.data.replies.data.children, level + 1), function(data) {
            comments.push(data)
          });
        }
      }
      return comments;
    }

    $scope.getComments();
    $scope.formatDate = TimeFormatterService.timeSince;
  });
