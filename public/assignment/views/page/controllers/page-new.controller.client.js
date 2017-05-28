(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController ($routeParams,
                                $location,
                                pageService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.createPage = createPage;

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.wid);
        }
        init();

        function createPage (page) {
            page.developerId = vm.uid;
            page.websiteId = vm.wid;
            pageService.createPage(page);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
        }
    }
})();