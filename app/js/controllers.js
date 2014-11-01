"use strict";

var crunchtimeControllers = angular.module("crunchtimeControllers", []);

crunchtimeControllers.controller('crunchtimeAppCtrl', function($scope, $interval) {
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

  $scope.countdown = function() {
    var endDate = new Date(2014, 10, 20);

    function updateCountdown() {
      var now = new Date();
      if (endDate > now) {
        $scope.countdown = ((enddate - now) / (1000 * 60 * 60 * 24)).toFixed(6) + " days remain 'til due"
      } else {
        $scope.countdown = "OVERDUE";
      }
    }

    $interval(updatecountdown, 30)
  }

});
