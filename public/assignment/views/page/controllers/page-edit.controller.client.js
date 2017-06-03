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
            pageService
                .findAllPagesForWebsite(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                    vm.oldPages = angular.copy(vm.pages);
                });
            pageService
                .findPageById(vm.pid)
                .then(function (page) {
                    vm.page = page;
                    vm.oldPage = angular.copy(vm.page);
                });
        }
        init();

        function deletePage (pid) {
            pageService
                .deletePage(pid)
                .then(function (){
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
                });
        }

        function updatePage (pid, page) {
            pageService
                .updatePage(pid, page)
                .then(function (){
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
                });

        }
    }
})();