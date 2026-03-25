(function () {
  'use strict';

  angular
    .module('todoApp')
    .filter('todoStatus', todoStatus);

  function todoStatus() {
    return function (items, mode) {
      var source = angular.isArray(items) ? items : [];

      if (mode === 'active') {
        return source.filter(function (item) {
          return !item.completed;
        });
      }

      if (mode === 'completed') {
        return source.filter(function (item) {
          return item.completed;
        });
      }

      return source;
    };
  }
}());
