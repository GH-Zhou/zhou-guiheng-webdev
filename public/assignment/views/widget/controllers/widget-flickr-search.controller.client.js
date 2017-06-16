(function () {
   angular
       .module('WebAppMaker')
       .controller('FlickrSearchController', FlickrSearchController);

   function FlickrSearchController($routeParams,
                                   $location,
                                   flickrService,
                                   currentUser,
                                   widgetService) {
       var vm = this;

       vm.uid = currentUser._id;
       vm.wid = $routeParams['wid'];
       vm.pid = $routeParams['pid'];
       vm.wgid = $routeParams['wgid'];

       vm.searchPhotos = searchPhotos;
       vm.selectPhoto = selectPhoto;

       function searchPhotos(searchTerm) {
           flickrService
               .searchPhotos(searchTerm)
               .then(function(response) {
                   data = response.data.replace("jsonFlickrApi(","");
                   data = data.substring(0,data.length - 1);
                   data = JSON.parse(data);
                   vm.photos = data.photos;
               });

       }

       function selectPhoto(photo) {
           var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
           url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
           widget =  {'_id': vm.wgid,
               'name': '',
               'widgetType': 'IMAGE',
               'pageId': vm.pid,
               'width': '',
               'url': url,
               'text': ''};
           widgetService
               .updateWidget(vm.wgid, widget)
               .then(function (){
                   $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget/' + vm.wgid);
               });
       }

   }
})();