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
        currentMode = 'hot',
        opts = {},
        after,
        before;

    $scope.pageSize = 50;
    $scope.formatDate = TimeFormatterService.timeSince;


    $scope.name = $routeParams.param;
    if($routeParams.before) {
      opts.before = $routeParams.before;
    } else if($routeParams.after) {
      opts.after = $routeParams.after;
    }
    $scope.count = $routeParams.count || $scope.pageSize;

    $scope.get = function (mode) {
      if(modes.indexOf(mode) > -1) {
        if(currentMode !== mode) {
          opts = {
            after: null,
            before: null,
            count: null
          };
        }
        currentMode = mode;
        var req = RedditService[currentMode]($scope.name).limit($scope.pageSize);

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
      $location.search({ before : before, after : null, count: $scope.count });
    };
    $scope.moveNext = function () {
      after = after || getFullName($scope.posts.length - 1);
      $scope.count += $scope.pageSize;
      $location.search({ before : null, after : after, count: $scope.count });
    };
    $scope.get('hot');
  });
