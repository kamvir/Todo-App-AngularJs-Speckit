(function () {
  'use strict';

  angular
    .module('todoApp')
    .component('todoItem', {
      templateUrl: 'app/components/todo-item/todo-item.template.html',
      controller: TodoItemController,
      controllerAs: 'vm',
      bindings: {
        todo: '<',
        onToggle: '&',
        onDelete: '&'
      }
    });

  function TodoItemController() {
    var vm = this;

    vm.handleToggle = handleToggle;
    vm.handleDelete = handleDelete;

    function handleToggle() {
      vm.onToggle({ id: vm.todo.id });
    }

    function handleDelete() {
      vm.onDelete({ id: vm.todo.id });
    }
  }
}());
