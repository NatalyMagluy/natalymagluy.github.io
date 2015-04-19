'use strict';

/**
 * @ngdoc function
 * @name app.service:RedditService
 * @description
 * # RedditService
 * Service of the app
 */
  angular.module('app')
    .factory('RedditService', function () {
      return reddit;
    });
