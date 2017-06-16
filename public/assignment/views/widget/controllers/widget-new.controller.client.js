(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);

    function NewWidgetController ($routeParams,
                                  $location,
                                  currentUser,
                                  widgetService) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(vm.pid)
                .then(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        function createWidget (pid, widgetType) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'name': '', 'type': 'HEADING', '_page': '', 'size': '', 'text': '', 'order': 10000};
                    break;
                case "HTML":
                    widget =  {'name': '', 'type': 'HTML', '_page': '', 'text': '', 'order': 10000};
                    break;
                case "TEXT":
                    widget =  {'name': '', 'type': 'TEXT', '_page': '', 'rows': '', 'placeholder': '', 'formatted': '', 'order': 10000};
                    break;
                case "IMAGE":
                    widget =  {'name': '', 'type': 'IMAGE', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 10000};
                    break;
                case "YOUTUBE":
                    widget =  {'name': '', 'type': 'YOUTUBE', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 10000};
                    break;
                default:
                    break;
            }
            // widget.pageId = vm.pid;
            widgetService
                .createWidget(pid, widget)
                .then(function (widget) {
                    $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget/' + widget._id);
                });
        }

    }
})();