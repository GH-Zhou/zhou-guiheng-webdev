(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController ($routeParams, pageService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        function init() {
            pageService
                .findAllPagesForWebsite(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                });
        }
        init();

    }
})();