(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController ($routeParams,
                                    $location,
                                    currentUser,
                                    websiteService) {
        var vm = this;

        vm.uid = currentUser._id;
        // vm.wid = $routeParams.wid;
        vm.wid = $routeParams['wid'];

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(vm.uid)
                .then(function (websites) {
                    vm.websites = websites;
                    vm.oldWebsites = angular.copy(vm.websites);
                });
            websiteService
                .findWebsiteById(vm.wid)
                .then(function (website) {
                    vm.website = website;
                    vm.oldWebsite = angular.copy(vm.website);
                });
        }
        init();

        function deleteWebsite (wid) {
            websiteService
                .deleteWebsite(wid)
                .then(function () {
                    $location.url('/website');
                });
        }

        function updateWebsite (wid, website) {
            if (website.name === null || website.name === '' || typeof website.name === 'undefined') {
                vm.error = "Name required!";
                vm.submitted = true;
                return;
            }
            websiteService
                .updateWebsite(wid, website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();