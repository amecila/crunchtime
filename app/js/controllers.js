"use strict";

var crunchtimeControllers = angular.module("crunchtimeControllers", []);

crunchtimeControllers.controller('crunchtimeAppCtrl', function($scope) {
  $scope.todos = [];

  $scope.done = function(index) {
    $scope.todos.splice(index, 1);
  };

  $scope.add = function(e) {
    if (e.which && e.which === 13) { //13 is the enter button
      $scope.todos.push($scope.newTodo);
      $scope.newTodo = '';
    }
  };

});
