(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController ($sce,
                                   $routeParams,
                                   currentUser,
                                   widgetService) {
        var vm = this;


        vm.uid = currentUser._id;
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.trust = trust;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.widgetUrl = widgetUrl;

        function init() {
            widgetService
                .findAllWidgetsForPage(vm.pid)
                .then(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl (linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function widgetUrl(widget) {
            var url = "views/widget/templates/widget-" + widget.type.toLowerCase() + ".view.client.html";
            return url;
        }

    }
})();