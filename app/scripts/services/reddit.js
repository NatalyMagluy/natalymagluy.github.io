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
      return {
        getHot: function(name) {
          // Fetch the 5 hottest posts on /r/awww
          reddit.hot(name).limit(5).fetch(function(res) {
            // res contains JSON parsed response from Reddit
            console.log(res);
          });
        }
      }
    });
