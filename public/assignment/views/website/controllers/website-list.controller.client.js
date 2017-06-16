(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController ($routeParams, currentUser, websiteService) {
        var vm = this;

        vm.uid = currentUser._id;

        function init() {
            websiteService
                .findAllWebsitesForUser(vm.uid)
                .then(function (websites) {
                    vm.websites = websites;
                });
        }
        init();

    }
})();