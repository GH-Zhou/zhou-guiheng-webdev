(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController ($routeParams,
                                    $location,
                                    websiteService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
        }
        init();

        function createWebsite (website) {
            website.developerId = model.uid;
            websiteService.createWebsite(website);
            $location.url('/user/' + model.uid + '/website');
        }
    }
})();