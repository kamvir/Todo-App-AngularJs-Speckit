describe('TodoService', function () {
  'use strict';

  var TodoService;
  var $window;

  beforeEach(module('todoApp'));

  beforeEach(inject(function (_TodoService_, _$window_) {
    TodoService = _TodoService_;
    $window = _$window_;
    $window.localStorage.clear();
    TodoService.getAll().splice(0, TodoService.getAll().length);
    TodoService.persist();
  }));

  it('adds a trimmed task and persists it', function () {
    var created = TodoService.add('  Buy milk  ');
    var stored = angular.fromJson($window.localStorage.getItem('todoListApp.todos.v1'));

    expect(created.description).toBe('Buy milk');
    expect(TodoService.getAll().length).toBe(1);
    expect(stored.length).toBe(1);
    expect(stored[0].description).toBe('Buy milk');
  });

  it('rejects empty or whitespace-only tasks', function () {
    expect(TodoService.add('')).toBeNull();
    expect(TodoService.add('   ')).toBeNull();
    expect(TodoService.getAll().length).toBe(0);
  });

  it('toggles and deletes tasks while keeping storage in sync', function () {
    var first = TodoService.add('First task');
    var second = TodoService.add('Second task');
    var stored;

    TodoService.toggle(first.id);
    expect(TodoService.getAll()[0].completed).toBe(true);

    TodoService.delete(second.id);
    stored = angular.fromJson($window.localStorage.getItem('todoListApp.todos.v1'));

    expect(TodoService.getAll().length).toBe(1);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(first.id);
  });

  it('counts only incomplete tasks', function () {
    var first = TodoService.add('One');
    TodoService.add('Two');

    TodoService.toggle(first.id);

    expect(TodoService.countIncomplete()).toBe(1);
  });
});
