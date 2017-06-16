(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController ($routeParams, currentUser, pageService) {
        var vm = this;

        vm.uid = currentUser._id;
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