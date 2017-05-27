(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController ($sce,
                                   $routeParams,
                                   widgetService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.trust = trust;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
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

    }
})();