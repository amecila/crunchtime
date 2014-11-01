"use strict";

var crunchtimeControllers = angular.module("crunchtimeControllers", []);

crunchtimeControllers.controller('crunchtimeAppCtrl', function($scope) {
  $scope.todos = [];

  $scope.done = function(index) {
    $scope.todos.splice(index, 1);
  };

  $scope.add = function(e) {
    if (e.which && e.which === 13) { //13 is the enter button
      var newTask = {description: $scope.newTodo, startTime: new Date(), endTime: null}; // TODO: set endTime
      $scope.todos.push(newTask);
      $scope.newTodo = '';
    }
  };

});
