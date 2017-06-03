(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController ($routeParams,
                                    $location,
                                    websiteService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(vm.uid)
                .then(function (websites) {
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite (website) {
            website.developerId = vm.uid;
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/' + vm.uid + '/website');
                });
        }
    }
})();