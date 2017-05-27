(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController ($routeParams,
                                    $location,
                                    websiteService) {
        var model = this;

        model.uid = $routeParams['uid'];
        // model.wid = $routeParams.wid;
        model.wid = $routeParams['wid'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
            model.website = websiteService.findWebsiteById(model.wid);
        }
        init();

        function deleteWebsite (wid) {
            websiteService.deleteWebsite(wid);
            $location.url('/user/' + model.uid + '/website');
        }

        function updateWebsite (wid, website) {
            websiteService.updateWebsite(wid, website);
            $location.url('/user/' + model.uid + '/website');
        }
    }
})();