'user strict';
angular.module('homeController',[])

.controller("HomeController", ['movieService','$scope','$cookies','$http', function(movieService,$scope,$cookies, $http) {
  $scope.movies = [];
  $scope.movieDetail = {};
  $scope.searchTitle="";
  $scope.searchGenre="";
  $scope.searchActors="";
  $scope.show = false;
  $scope.user = $cookies.getObject('user');
  $scope.resultFound = false;



  if($scope.user){
    console.log("user found! get movie from database");
    console.log($scope.user);
    getMovie();
  }else {
    console.log("User not found! get movie from local storage")
    $scope.movies = movieService.getList();
  }

  function getMovie(){
    $http.get('/get',{params: {uid: $scope.user.uid}}).then(function(res){
        console.log("GOT MOVIE");
        console.log(res.data);
        $scope.movies = res.data;
      },function(err){
    });
  }

  //search filter
  $scope.search = function(movie) {
      $scope.resultFound = false;
    if ( $scope.searchTitle || $scope.searchGenre ||$scope.searchActors) {
      console.log("in if");
      $scope.searchGenreParsed = $scope.searchGenre.split(" ");
      $scope.searchActorsParsed = $scope.searchActors.split(" ");
      $scope.genreCounter = 0;
      $scope.actorsCounter = 0;
      for(var i in $scope.searchGenreParsed){
        if(movie.genre.toLowerCase().indexOf($scope.searchGenreParsed[i].toLowerCase() ) !== -1)
        {
          $scope.genreCounter ++;
        }
      }

      for(var i in $scope.searchActorsParsed){
        if(movie.actors.toLowerCase().indexOf($scope.searchActorsParsed[i].toLowerCase() ) !== -1)
        {
          console.log("GOT ONE");
          $scope.actorsCounter ++;
        }
      }

      if(movie.title.toLowerCase().indexOf($scope.searchTitle.toLowerCase()) !== -1 &&
          $scope.genreCounter === $scope.searchGenreParsed.length &&
            $scope.actorsCounter === $scope.searchActorsParsed.length){
        return true;
      }
      $scope.resultFound = true;
      return false;
    }
    return true;
	};

  $scope.deleteServer = function(movie){
      $http.post('/delete',movie).then(function(res){
          console.log("Successfully Deleted movie from database");
          if($scope.movieDetail.mid){
            if(movie.mid === $scope.movieDetail.mid){
                $scope.show=false;
            }
          }
          getMovie();
        },function(err){
      });
  };

  $scope.deleteLocal = function (index){
    if(index === $scope.movieDetail.index){
        $scope.show=false;
    }
    movieService.delete(index);
    $scope.movies = movieService.getList();
  }

  $scope.showDetail = function(movie,index){
     $scope.show = true;
     $scope.movieDetail = movie;
     $scope.movieDetail.index =  index;
  };


  console.log($scope.movies);

}]);
