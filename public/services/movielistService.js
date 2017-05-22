'use strict';

app.factory('movieService', function () {
  var movieList = [];

  return {
    addItem: addItem,
    getList: getList,
    empty: empty
  };

  function addItem(item) {
    movieList.push(item);
    console.log(movieList);
  }
  function getList() {
    return movieList;
  }
  function empty(){
    movieList = [];
    // console.log("EMPTY MOVIE LIST");
  }



});
