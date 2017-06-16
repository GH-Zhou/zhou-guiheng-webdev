(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController ($routeParams,
                                    $location,
                                    currentUser,
                                    websiteService) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(vm.uid)
                .then(function (websites) {
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite (uid, website) {
            // website._user = vm.uid;
            websiteService
                .createWebsite(uid, website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();