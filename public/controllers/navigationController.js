'user strict';
angular.module('navigationController',[])
.controller("NavigationController", ['$scope','$cookies','$state','movieService', function ($scope,$cookies,$state,movieService){
   $scope.user = $cookies.getObject('user');
   console.log("FROM APP CONTROLLER");
   console.log($scope.user);
   console.log("FROM APP CONTROLLER");

   $scope.signOut= function() {
     console.log("LOG OUT");
     $cookies.remove('user');
     //delete user
     movieService.empty();
     $state.go('home',null, {reload:true});

   };

}])
