'user strict';
angular.module('searchController',[])

.controller('SearchController', ['movieService','$scope', '$http','$cookies','uuid2', function(movieService,$scope, $http,$cookies,uuid2 ) {
  if($cookies.getObject('user')){
    $scope.uid = $cookies.getObject('user').uid;
  }

  $scope.movie = {};
  $scope.title = "MOVIE LIST";
  $scope.$watch('search', function(){
   fetch();
  });

 $scope.search = "";

 function fetch () {
   console.log("SEARCH FOR MOVIE: KEY: " + $scope.search);
   $http.get("https://www.omdbapi.com/?apikey=f6709120&t=" + $scope.search + "&tomatoes=true&plot=full")
      .then(function(response){
          $scope.details = response.data;
          console.log($scope.details);
      });
      $http.get("https://www.omdbapi.com/?apikey=f6709120&s=" + $scope.search)
      .then(function(response){ $scope.related = response.data; });
    }

 $scope.update = function(movie){
      $scope.search = movie.Title;
    }

 $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }

  $scope.add = function () {
    $scope.movie.year= $scope.details.Year;
    $scope.movie.image= $scope.details.Poster;
    $scope.movie.title= $scope.details.Title;
    $scope.movie.released= $scope.details.Released;
    $scope.movie.genre= $scope.details.Genre;
    $scope.movie.actors= $scope.details.Actors;
    $scope.movie.director= $scope.details.Director;
    $scope.movie.plot= $scope.details.Plot;
    $scope.movie.runtime= $scope.details.Runtime;
    $scope.movie.imdbRating= $scope.details.imdbRating;

    if($scope.uid){
      $scope.movie.mid = uuid2.newuuid();
      $scope.movie.uid = $scope.uid;
      $http.post('/add',$scope.movie).then (function (res){
          console.log("Entry added");
        },function(err){

        });
    }else {
      //if user is not logged in->
      movieService.addItem($scope.movie);
    }

  }


}]);
