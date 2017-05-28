(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController ($routeParams,
                                 $location,
                                 pageService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.wid);
            vm.page = pageService.findPageById(vm.pid);
        }
        init();

        function deletePage (pid) {
            pageService.deletePage(pid);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
        }

        function updatePage (pid, page) {
            pageService.updatePage(pid, page);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
        }
    }
})();