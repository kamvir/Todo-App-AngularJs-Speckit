describe('todoStatus filter', function () {
  'use strict';

  var todoStatus;
  var items = [
    { id: '1', description: 'One', completed: false },
    { id: '2', description: 'Two', completed: true }
  ];

  beforeEach(module('todoApp'));

  beforeEach(inject(function ($filter) {
    todoStatus = $filter('todoStatus');
  }));

  it('returns all items for all mode', function () {
    expect(todoStatus(items, 'all').length).toBe(2);
    expect(todoStatus(items, 'unknown').length).toBe(2);
  });

  it('returns only active items', function () {
    expect(todoStatus(items, 'active').length).toBe(1);
    expect(todoStatus(items, 'active')[0].id).toBe('1');
  });

  it('returns only completed items', function () {
    expect(todoStatus(items, 'completed').length).toBe(1);
    expect(todoStatus(items, 'completed')[0].id).toBe('2');
  });
});
