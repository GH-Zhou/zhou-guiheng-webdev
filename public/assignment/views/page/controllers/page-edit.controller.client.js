(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController ($routeParams,
                                 $location,
                                 pageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.wid);
            model.page = pageService.findPageById(model.pid);
        }
        init();

        function deletePage (pid) {
            pageService.deletePage(pid);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
        }

        function updatePage (pid, page) {
            pageService.updatePage(pid, page);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
        }
    }
})();