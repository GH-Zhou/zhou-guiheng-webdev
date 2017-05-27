(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController ($routeParams,
                                $location,
                                pageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.wid);
        }
        init();

        function createPage (page) {
            page.developerId = model.uid;
            page.websiteId = model.wid;
            pageService.createPage(page);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
        }
    }
})();