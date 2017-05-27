(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);

    function NewWidgetController ($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.createWidget = createWidget;
        model.switchEditor = switchEditor;

        model.heading = false;
        model.image = false;
        model.youtube = false;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
        }
        init();

        function createWidget (widget, widgetType) {
            widget.developerId = model.uid;
            widget.websiteId = model.wid;
            widget.pageId = model.pid;
            widgetService.createWidget(widget, widgetType);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
        }

        function switchEditor (widgetType) {
            switch(widgetType) {
                case "HEADING":
                    model.heading = !model.heading;
                    break;
                case "IMAGE":
                    model.image = !model.image;
                    break;
                case "YOUTUBE":
                    model.youtube = !model.youtube;
                    break;
                default:
                    break;
            }
        }
    }
})();