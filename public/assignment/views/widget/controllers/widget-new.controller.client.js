(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);

    function NewWidgetController ($routeParams,
                                  $location,
                                  widgetService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(vm.wid)
                .then(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        function createWidget (widgetType) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'size': '', 'text': ''};
                    break;
                case "IMAGE":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                    break;
                case "YOUTUBE":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                    break;
                default:
                    break;
            }
            widget.widgetType = widgetType;
            widget.pageId = vm.pid;
            widgetService
                .createWidget(widget, vm.pid)
                .then(function (widget) {
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/' + widget._id);
                });
        }

    }
})();