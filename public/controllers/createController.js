'user strict';
angular.module('createController',[])

.controller('CreateController', ['movieService','$scope','uuid2','$cookies','$http','$state', function(movieService,$scope,uuid2,$cookies,$http,$state ) {

  if($cookies.getObject('user')){
    $scope.uid = $cookies.getObject('user').uid;
  }
  $scope.movie = {}

  $scope.add = function () {
  if($scope.movie.title && $scope.movie.genre && $scope.movie.actors) {
    if($scope.uid){
      $scope.movie.mid = uuid2.newuuid();
      $scope.movie.uid = $scope.uid;
      $http.post('/add',$scope.movie).then (function (res){
          console.log("Entry added");
            $state.go('home',null, {reload:true});
        },function(err){

        });
      }else {
          movieService.addItem($scope.movie);
          $state.go('home',null, {reload:true});
      }
  }


  }

}]);
