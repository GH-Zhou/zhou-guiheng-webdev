(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController ($routeParams,
                                 $location,
                                 currentUser,
                                 pageService) {
        var vm = this;

        vm.uid = currentUser._id;
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
                    $location.url('/website/' + vm.wid + '/page');
                });
        }

        function updatePage (pid, page) {
            if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
                vm.error = "Name required!";
                vm.submitted = true;
                return;
            }
            pageService
                .updatePage(pid, page)
                .then(function (){
                    $location.url('/website/' + vm.wid + '/page');
                });

        }
    }
})();