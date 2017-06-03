(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController ($routeParams, websiteService) {
        var vm = this;

        vm.uid = $routeParams['uid'];

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