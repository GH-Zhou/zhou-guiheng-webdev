(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController ($routeParams,
                                $location,
                                currentUser,
                                pageService) {
        var vm = this;

        vm.uid = currentUser._id;
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
            if (page === null || page === '' || typeof page === 'undefined') {
                vm.error = "Name required!";
                vm.submitted = true;
                return;
            }
            pageService
                .createPage(wid, page)
                .then(function () {
                    $location.url('/website/' + vm.wid + '/page');
                });
        }
    }
})();