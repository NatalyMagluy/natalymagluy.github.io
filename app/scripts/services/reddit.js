'use strict';

/**
 * @ngdoc function
 * @name app.service:RedditService
 * @description
 * # RedditService
 * Service of the app
 */
  angular.module('app')
    .factory('RedditService', function ($q) {
      return {
        getHot: function(name) {
          var deferred = $q.defer();
          reddit.hot(name).limit(50).fetch(function(res) {
            deferred.resolve(res);
          });
          return deferred.promise;
        },
        getTop: function(name) {
          var deferred = $q.defer();
          reddit.top(name).limit(50).fetch(function(res) {
            deferred.resolve(res);
          });
          return deferred.promise;
        },
        getNew: function(name) {
          var deferred = $q.defer();
          reddit.new(name).limit(50).fetch(function(res) {
            deferred.resolve(res);
          });
          return deferred.promise;
        },
        getControversial: function(name) {
          var deferred = $q.defer();
          reddit.controversial(name).limit(50).fetch(function(res) {
            deferred.resolve(res);
          });
          return deferred.promise;
        },
        getComments: function(name, article) {
          var deferred = $q.defer();
          reddit.comments(article, name).limit(50).sort("hot").fetch(function(res) {
            deferred.resolve(res);
          });
          return deferred.promise;
        }
      }
    });
