'user strict';
angular.module('signupController',[])

.controller('SignupController', ['movieService','$scope','uuid2','$http', '$cookies','$state', function(movieService,$scope,uuid2,$http,$cookies,$state) {
$scope.user = {};

  $scope.signup = function () {

      if($scope.user.password &&$scope.user.username){
        $scope.user.uid = uuid2.newuuid();
        console.log("USER WATNS TO SIGNUP!!!");
        $http.post('/auth/signup',$scope.user).then(function(res){
           console.log(res);
           var expireDate = new Date();
           expireDate.setFullYear(expireDate.getFullYear() + 1);

           $cookies.putObject('user',$scope.user, {
             expires: expireDate
           });

           $state.go('home',null, {reload:true});
         }, function(err){
           console.log("ERROR signing up" + err.data);
           $scope.signUpError = err.data
         });
      }
  }

}]);
