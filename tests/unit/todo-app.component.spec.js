describe('todoApp component', function () {
  'use strict';

  var $componentController;
  var TodoService;
  var $window;

  beforeEach(module('todoApp'));

  beforeEach(inject(function (_$componentController_, _TodoService_, _$window_) {
    $componentController = _$componentController_;
    TodoService = _TodoService_;
    $window = _$window_;
    $window.localStorage.clear();
    TodoService.getAll().length = 0;
    TodoService.persist();
  }));

  function createController() {
    return $componentController('todoApp', null, {});
  }

  it('adds a task and clears the input', function () {
    var controller = createController();

    controller.newTaskDescription = 'Read docs';
    controller.addTask();

    expect(controller.todos.length).toBe(1);
    expect(controller.todos[0].description).toBe('Read docs');
    expect(controller.newTaskDescription).toBe('');
    expect(controller.hasValidationError).toBe(false);
  });

  it('blocks empty task creation with validation state', function () {
    var controller = createController();

    controller.newTaskDescription = '   ';
    controller.addTask();

    expect(controller.todos.length).toBe(0);
    expect(controller.hasValidationError).toBe(true);
    expect(controller.validationMessage).toContain('Please enter a task');
  });

  it('updates filter mode and incomplete count', function () {
    var controller = createController();
    controller.newTaskDescription = 'One';
    controller.addTask();
    controller.newTaskDescription = 'Two';
    controller.addTask();

    controller.toggleTask(controller.todos[0].id);
    controller.setFilter('completed');

    expect(controller.filterMode).toBe('completed');
    expect(controller.getIncompleteCount()).toBe(1);
  });
});
