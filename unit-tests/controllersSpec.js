"use strict";

beforeEach(module("crunchtimeApp"));

describe("crunchtime controller", function() {

  var scope, todos, ctrl;

  beforeEach(inject(function($controller) {
    todos = [
      'Find a bunny',
      'Pet the bunny',
      'Repeat'];
    scope = {};
    ctrl = $controller("crunchtimeAppCtrl", {$scope: scope});
  }));

  it("should have an empty todo initially", function() {
    expect(scope.todos.length).toBe(0);
  });

});