(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController ($routeParams,
                                    $location,
                                    websiteService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
        }
        init();

        function createWebsite (website) {
            website.developerId = vm.uid;
            websiteService.createWebsite(website);
            $location.url('/user/' + vm.uid + '/website');
        }
    }
})();