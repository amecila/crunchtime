"use strict";

var crunchtimeControllers = angular.module("crunchtimeControllers", []);

crunchtimeControllers.controller('crunchtimeAppCtrl', function($scope, $interval) {
  $scope.todos = [{description: "something very very long", startTime: new Date(), endTime: new Date(2014, 11, 30)},
    {description: 'short', startTime: new Date(), endTime: new Date(2014, 11, 30)}
  ];

  var today = new Date();

  function resetDateModels() {
    $scope.dueDate = today.getDate();
    $scope.dueMonth = today.getMonth() + 1;
    $scope.dueYear = today.getFullYear();
  }

  resetDateModels();

  $scope.done = function(index) {
    $scope.todos.splice(index, 1);
  };

  $scope.add = function() {
    var dueDate = new Date($scope.dueYear, $scope.dueMonth - 1, $scope.dueDate);
    var newTask = {description: $scope.newTodo, startTime: new Date(), endTime: dueDate};
    $scope.todos.push(newTask);
    $scope.newTodo = '';
    resetDateModels();
  };

  function updateCountdown() {
    var now = new Date();
    for (var i = 0; i < $scope.todos.length; i++) {
      var todo = $scope.todos[i];
      if ((todo.endTime - now) > (30 * 60 * 60 * 1000)) {
        todo.countdown = ((todo.endTime - now) / (1000 * 60 * 60 * 24)).toFixed(6) + " days left.";
      }
      else if (todo.endTime > now) {
        todo.countdown = ((todo.endTime - now) / (1000 * 60 * 60)).toFixed(5) + " hours left.";
      }
      else {

        todo.countdown = "OVERDUE";
      }
    }
  }

  $interval(updateCountdown, 30);

});
