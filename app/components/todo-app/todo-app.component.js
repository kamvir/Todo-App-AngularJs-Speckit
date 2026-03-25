(function () {
  'use strict';

  angular
    .module('todoApp')
    .component('todoApp', {
      templateUrl: 'app/components/todo-app/todo-app.template.html',
      controller: TodoController,
      controllerAs: 'vm'
    });

  function TodoController(TodoService) {
    var vm = this;

    vm.todos = TodoService.getAll();
    vm.newTaskDescription = '';
    vm.filterMode = 'all';
    vm.hasValidationError = false;
    vm.validationMessage = '';
    vm.addTask = addTask;
    vm.toggleTask = toggleTask;
    vm.deleteTask = deleteTask;
    vm.getIncompleteCount = getIncompleteCount;
    vm.setFilter = setFilter;

    function addTask() {
      var created = TodoService.add(vm.newTaskDescription);

      if (!created) {
        vm.hasValidationError = true;
        vm.validationMessage = 'Please enter a task before adding it.';
        return;
      }

      vm.newTaskDescription = '';
      vm.hasValidationError = false;
      vm.validationMessage = '';
    }

    function toggleTask(id) {
      TodoService.toggle(id);
    }

    function deleteTask(id) {
      TodoService.delete(id);
    }

    function getIncompleteCount() {
      return TodoService.countIncomplete();
    }

    function setFilter(mode) {
      vm.filterMode = mode || 'all';
    }
  }

  TodoController.$inject = ['TodoService'];
}());
