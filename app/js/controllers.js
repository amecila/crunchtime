"use strict";

var crunchtimeControllers = angular.module("crunchtimeControllers", []);

crunchtimeControllers.controller('crunchtimeAppCtrl', function($scope, $mdToast, $firebase, $interval) {

  var ref = new Firebase("https://crunchtimedb.firebaseio.com/");
  var userRef;
  $scope.loggedIn = false;
  var onAuth = function(authData) {
    if (authData) {
      userRef = new Firebase("https://crunchtimedb.firebaseio.com/users/").child(authData.uid);
      userRef.on('value', function(snap) {
        if (authData) {
          $scope.todos = snap.val();
          if (!$scope.todos) $scope.todos = [];
        }
      });
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
      $scope.todos = [];
    }
  };
  ref.onAuth(onAuth);

  var authData = ref.getAuth();
  onAuth(authData);

  $scope.googleAuth = function() {
    ref.authWithOAuthPopup('google', function(err, authData) {
      if (err) console.log("Login failed: ", err);
      else console.log("Logged in as ", authData.uid);
    });
  };

  $scope.googleDeauth = function() {
    ref.unauth();
  };

   $scope.todos = [
    // {description: "something very very long", startTime: new Date(), endTime: new Date(2014, 11, 30)},
    // {description: 'short', startTime: new Date(), endTime: new Date(2014, 11, 30)},
    // {description: 'almost done', startTime: new Date(2014, 9, 30), endTime: new Date(2014, 10, 2)}
   ];

  var today = new Date();

  function resetDateModels() {
    $scope.dueDate = today.getDate();
    $scope.dueMonth = today.getMonth() + 1;
    $scope.dueYear = today.getFullYear();
  }

  resetDateModels();

  $scope.done = function(description) {
    var index;
    for (var i = 0; i < $scope.todos.length; i++) {
      if ($scope.todos[i].description === description) index = i;
    }
    $scope.toastIt($scope.todos[index].description);
    $scope.todos.splice(index, 1);
    userRef.set(angular.copy($scope.todos));
  };

  $scope.add = function() {
    var dueDate = (new Date($scope.dueYear, $scope.dueMonth - 1, $scope.dueDate)).getTime();
    var newTask = {description: $scope.newTodo, startTime: (new Date()).getTime(), endTime: dueDate};
    $scope.todos.push(newTask);
    userRef.set(angular.copy($scope.todos));
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

    for (var i = 0; i < $scope.todos.length; i++) {
      var todo = $scope.todos[i];
      todo.percentageCompleted = (now - todo.startTime) / (todo.endTime - todo.startTime) * 100;
      if (todo.percentageCompleted < 0 || todo.percentageCompleted === null) {
        todo.theme = 'red';
        todo.percentageCompleted = 100;
      }
      else if (todo.percentageCompleted < 33) todo.theme = 'green';
      else if (todo.percentageCompleted < 67) todo.theme = 'yellow';
      else if (todo.percentageCompleted <= 100) todo.theme = 'orange';
      else todo.theme = 'red';
    }
  }

  $interval(updateCountdown, 30);

  $scope.toastIt = function (task) {
    $mdToast.show({
      template: '<md-toast>Finished {{toastCtrl.task}}</md-toast>',
      controller: function() {
        this.task = task;
      },
      controllerAs: 'toastCtrl',
      hideDelay: 2000,
      position: 'right bottom'
    });
  };
});
