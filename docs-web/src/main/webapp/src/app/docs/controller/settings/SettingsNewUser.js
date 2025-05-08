'use strict';

/**
 * Registration requests management controller.
 */
angular.module('docs').controller('SettingsNewUser', function($scope, $state, Restangular, User) {
  /**
   * Load users from server.
   */
  $scope.loadUsers = function() {
    Restangular.one('user/list').get({
      sort_column: 1,
      asc: true,
      type: 1
    }).then(function(data) {
      $scope.users = data.users;
    });
  };
  
  $scope.loadUsers();
  
  /**
   * Apporve a user.
   */
  $scope.approve = function(user) {
    console.log('Approving user:', user);
    user.disabled = false; // Set disabled to false
    Restangular.one('user', user.username).customPOST({
      password: user.password,
      email: user.email,
      storage_quota: user.storageQuota,
      disabled: user.disabled
    }).then(function() {
    $scope.loadUsers();
    });
  };

  /**
   * Reject a user.
   */
  $scope.reject = function(user) {
    Restangular.one('user', user.username).remove().then(function() {
      $scope.loadUsers();
    });
  }
});