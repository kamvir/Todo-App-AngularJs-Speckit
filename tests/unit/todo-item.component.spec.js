describe('todoItem component', function () {
  'use strict';

  var $componentController;
  var toggleSpy;
  var deleteSpy;

  beforeEach(module('todoApp'));

  beforeEach(inject(function (_$componentController_) {
    $componentController = _$componentController_;
    toggleSpy = jasmine.createSpy('toggleSpy');
    deleteSpy = jasmine.createSpy('deleteSpy');
  }));

  it('invokes bound callbacks for toggle and delete', function () {
    var controller = $componentController('todoItem', null, {
      todo: { id: 'abc', description: 'Task', completed: false },
      onToggle: toggleSpy,
      onDelete: deleteSpy
    });

    controller.handleToggle();
    controller.handleDelete();

    expect(toggleSpy).toHaveBeenCalledWith({ id: 'abc' });
    expect(deleteSpy).toHaveBeenCalledWith({ id: 'abc' });
  });
});
