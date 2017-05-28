(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController ($routeParams, websiteService) {
        var vm = this;

        vm.uid = $routeParams['uid'];

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
        }
        init();

    }
})();