"use strict";

var crunchtimeControllers = angular.module("crunchtimeControllers", []);

crunchtimeControllers.controller('crunchtimeAppCtrl', function($scope, $interval) {
  $scope.todos = [];

  $scope.done = function(index) {
    $scope.todos.splice(index, 1);
  };

  $scope.add = function(e) {
    if (e.which && e.which === 13) { //13 is the enter button
      var newTask = {description: $scope.newTodo, startTime: new Date(), endTime: new Date(2014, 11, 30)}; // TODO: set endTime
      $scope.todos.push(newTask);
      $scope.newTodo = '';
    }
  };

  function updateCountdown() {
    var now = new Date();
    for (var i = 0; i < $scope.todos.length; i++) {
      var todo = $scope.todos[i];
      if (todo.endTime > now) {
        todo.countdown = ((todo.endTime - now) / (1000 * 60 * 60 * 24)).toFixed(6);
      } else {
        todo.countdown = "OVERDUE";
      }
    }
  }

  $interval(updateCountdown, 30);

});
