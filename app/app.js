'use strict';

// Declare app level module which depends on views, and components
var crunchtimeApp = angular.module('crunchtimeApp', ['ngMaterial']);

//Controllers
crunchtimeApp.controller('crunchtimeAppCtrl', function($scope) {
    $scope.todos = [
        'Find a bunny',
        'Pet the bunny',
        'Repeat'
    ];

    $scope.done = function(todo) {
        var indexOf = $scope.todos.indexOf(todo);
        if (indexOf !== -1) { //only do something if task is inside the list
            $scope.todos.splice (indexOf, 1);
        }
    }

    $scope.add = function(e) {
        if (e.which && e.which === 13) { //13 is the enter button
            $scope.todos.push($scope.newTodo);
            $scope.newTodo = '';
        }
    }

});
