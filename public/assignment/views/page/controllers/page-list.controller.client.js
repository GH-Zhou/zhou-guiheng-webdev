(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController ($routeParams, pageService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.wid);
        }
        init();

    }
})();