(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController ($routeParams, pageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.wid);
        }
        init();

    }
})();