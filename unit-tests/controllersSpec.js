"use strict";

beforeEach(module("crunchtimeApp"));

describe("crunchtime controller", function() {

  var scope, todos, ctrl;

  beforeEach(inject(function($controller) {
    todos = [
      {description: 'Find a bunny', endTime: null, startTime: null},
      {description: 'Pet the bunny', endTime: null, startTime: null},
      {description: 'Repeat', endTime: null, startTime: null}];
    scope = {};
    ctrl = $controller("crunchtimeAppCtrl", {$scope: scope});
  }));

  it("should have an empty todo initially", function() {
    expect(scope.todos.length).toBe(0);
  });

  it("should remove the right item", function() {
    scope.todos = angular.copy(todos);
    scope.done(2); // remove "Repeat"
    expect(scope.todos).toEqual(todos.splice(0,2));
  });

  it('should add and remove bottom of list', function() {
    scope.todos = todos;
    scope.newTodo = "new task";
    scope.add({which: 13});
    expect(scope.todos[3].description).toEqual('new task');
    scope.done(3);
    expect(scope.todos).toEqual(todos);
  })

});