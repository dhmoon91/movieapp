'user strict';
angular.module('loginController',[])

.controller('LoginController', ['movieService','$scope','$http','$cookies','$state', function(movieService,$scope,$http,$cookies,$state ) {
  $scope.user = {};


  $scope.login = function () {
    if($scope.user.password &&$scope.user.username){
      $http.post('/auth/login',$scope.user).then (function(res){
            console.log("GOT BACK FROM SERVER USER LOGGED IN: ")

            $scope.user = res.data;
            console.log($scope.user);
            var expireDate = new Date();
            expireDate.setFullYear(expireDate.getFullYear() + 1);

            $cookies.putObject('user',$scope.user, {
              expires: expireDate
            });
              $state.go('home',null, {reload:true});

      }, function (err) {
        console.log("ERROR logging in" + err.data);
        $scope.loginError = err.data
      });
    }
  }

}]);
