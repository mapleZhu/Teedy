'use strict';

/**
 * Register controller.
 */
angular.module('docs').controller('Register', function(Restangular, $scope, $rootScope, $state, $stateParams, $dialog, User, $translate, $uibModal) {
  
  $scope.success = false;

  // Initialize user object
  $scope.user = {
    username: '',
    email: '',
    password: ''
  };
  
  // Toggle password visibility
  $scope.showPassword = true;
  
  // Register function
  $scope.register = function() {
    console.log('Registering user:', $scope.user);
    User.register($scope.user).then(function(response) {
      $scope.success = true;
      console.log('注册成功，服务器返回:', {
        status: response.status,
        message: response.message
      });
      console.log('User registered successfully:', $scope.user);
      $state.go('login');
    });
  };
  
  // Navigate to login page
  $scope.goToLogin = function() {
    $state.go('login');
  };
  
  // Toggle password field type
  $scope.toggle = function() {
    console.log('toggle password visibility');
    $scope.showPassword = !$scope.showPassword;
  };
});