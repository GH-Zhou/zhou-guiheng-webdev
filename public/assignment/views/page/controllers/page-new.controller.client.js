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
            pageService
                .findAllPagesForWebsite(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                });
        }
        init();

        function createPage (wid, page) {
            // page._website = vm.wid;
            pageService
                .createPage(wid, page)
                .then(function () {
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page');
                });
        }
    }
})();