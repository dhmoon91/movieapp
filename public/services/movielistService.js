'use strict';

app.factory('movieService', function () {
  var movieList = [];

  return {
    addItem: addItem,
    getList: getList,
    empty: empty,
    delete: deleteLocal
  };

  function addItem(item) {
    movieList.unshift(item);
    console.log(movieList);
  }
  function getList() {
    return movieList;
  }
  function empty(){
    movieList = [];
    // console.log("EMPTY MOVIE LIST");
  }
  function deleteLocal(index) {
    console.log("DELETE in movie sevice" + index);
    movieList.splice(index,1);
  }



});
