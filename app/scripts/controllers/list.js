'use strict';

/**
 * @ngdoc function
 * @name app.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ListCtrl', function ($scope,
                                    $location,
                                    $routeParams,
                                    RedditService,
                                    TimeFormatterService) {
    var modes = ['top', 'hot', 'new', 'controversial'],
        opts = {},
        after,
        before;

    $scope.pageSize = 25;
    $scope.formatDate = TimeFormatterService.timeSince;
    $scope.loading = false;

    $scope.name = $routeParams.param;
    $scope.mode = $routeParams.mode || 'hot';
    if($routeParams.before) {
      opts.before = $routeParams.before;
    } else if($routeParams.after) {
      opts.after = $routeParams.after;
    }
    $scope.count = $routeParams.count || $scope.pageSize;

    $scope.get = function (mode) {
      if(modes.indexOf(mode) > -1) {
        if($scope.mode !== mode) {
          $location.search({mode: mode, before: null, after: null, count: null});
          return;
        }
        $scope.loading = true;
        $scope.mode = mode;
        var req = RedditService[$scope.mode]($scope.name).limit($scope.pageSize);

        if(opts.after) {
          req.after(opts.after);
        }
        if(opts.before) {
          req.before(opts.before);
        }

        req.fetch(dataHandler);
      }
    };

    function dataHandler(val) {
      $scope.posts = val.data.children;
      after = val.data.after;
      before = val.data.before;
      $scope.loading = false;
      $scope.$apply();
    }

    function getFullName(index) {
      var obj = $scope.posts[index];
      if(!obj) {
        return "";
      }
      return obj.kind + '_' + obj.data.id;
    }

    $scope.movePrev = function () {
      before = before || getFullName(0);
      $scope.count -= $scope.pageSize;
      $location.search({ mode : $scope.mode, before : before, after : null, count: $scope.count });
    };
    $scope.moveNext = function () {
      after = after || getFullName($scope.posts.length - 1);
      $scope.count += $scope.pageSize;
      $location.search({ mode : $scope.mode, before : null, after : after, count: $scope.count });
    };

    $scope.get($scope.mode);
  });
