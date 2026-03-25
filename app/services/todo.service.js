(function () {
  'use strict';

  angular
    .module('todoApp')
    .service('TodoService', TodoService);

  function TodoService($window) {
    var service = this;
    var storageKey = 'todoListApp.todos.v1';
    var items = load();

    service.getAll = getAll;
    service.add = add;
    service.toggle = toggle;
    service.delete = remove;
    service.countIncomplete = countIncomplete;
    service.load = load;
    service.persist = persist;

    function getAll() {
      return items;
    }

    function add(description) {
      var trimmed = (description || '').replace(/^\s+|\s+$/g, '');
      var todo;

      if (!trimmed) {
        return null;
      }

      todo = {
        id: String(new Date().getTime()) + '-' + String(items.length + 1),
        description: trimmed,
        completed: false,
        createdAt: new Date().toISOString()
      };

      items.push(todo);
      persist();
      return todo;
    }

    function toggle(id) {
      var index;

      for (index = 0; index < items.length; index += 1) {
        if (items[index].id === id) {
          items[index].completed = !items[index].completed;
          persist();
          break;
        }
      }
    }

    function remove(id) {
      var index;

      for (index = 0; index < items.length; index += 1) {
        if (items[index].id === id) {
          items.splice(index, 1);
          persist();
          break;
        }
      }
    }

    function countIncomplete() {
      var count = 0;
      var index;

      for (index = 0; index < items.length; index += 1) {
        if (!items[index].completed) {
          count += 1;
        }
      }

      return count;
    }

    function load() {
      var raw;
      var parsed;
      var index;
      var sanitized = [];

      try {
        raw = $window.localStorage.getItem(storageKey);
        parsed = raw ? angular.fromJson(raw) : [];
      } catch (error) {
        parsed = [];
      }

      if (!angular.isArray(parsed)) {
        return [];
      }

      for (index = 0; index < parsed.length; index += 1) {
        if (parsed[index] && parsed[index].description) {
          sanitized.push({
            id: parsed[index].id,
            description: String(parsed[index].description),
            completed: !!parsed[index].completed,
            createdAt: parsed[index].createdAt || new Date().toISOString()
          });
        }
      }

      return sanitized;
    }

    function persist() {
      try {
        $window.localStorage.setItem(storageKey, angular.toJson(items));
      } catch (error) {
        return false;
      }

      return true;
    }
  }

  TodoService.$inject = ['$window'];
}());
