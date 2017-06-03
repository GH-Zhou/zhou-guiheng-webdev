(function () {
   angular
       .module('WebAppMaker')
       .controller('FlickrSearchController', FlickrSearchController);

   function FlickrSearchController(flickrService) {
       var vm = this;

       vm.searchPhotos = searchPhotos;

       function searchPhotos(searchTerm) {
           flickrService
               .searchPhotos(searchTerm)
               .then(function(response) {
                   console.log(response.data);
                   data = response.data.replace("jsonFlickrApi(","");
                   data = data.substring(0,data.length - 1);
                   data = JSON.parse(data);
                   vm.photos = data.photos;
               });

       }
   }
})();