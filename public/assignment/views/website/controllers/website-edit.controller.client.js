(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController ($routeParams,
                                    $location,
                                    websiteService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        // vm.wid = $routeParams.wid;
        vm.wid = $routeParams['wid'];

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
            vm.website = websiteService.findWebsiteById(vm.wid);
        }
        init();

        vm.oldWebsites = angular.copy(vm.websites);
        vm.oldWebsite = angular.copy(vm.website);

        function deleteWebsite (wid) {
            websiteService.deleteWebsite(wid);
            $location.url('/user/' + vm.uid + '/website');
        }

        function updateWebsite (wid, website) {
            websiteService.updateWebsite(wid, website);
            $location.url('/user/' + vm.uid + '/website');
        }
    }
})();