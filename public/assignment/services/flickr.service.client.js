(function () {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "820d7b976d5fed14e567ca3f12fc787c";
        var secret = "b89e18e6ca8a8c1b";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();