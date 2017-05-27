(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController ($routeParams, websiteService) {
        var model = this;

        model.uid = $routeParams['uid'];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
        }
        init();

    }
})();