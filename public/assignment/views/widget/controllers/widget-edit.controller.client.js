(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController ($routeParams,
                                 $location,
                                 widgetService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
            model.widget = widgetService.findWidgetById(model.wgid);
        }
        init();

        function deleteWidget (wgid) {
            widgetService.deleteWidget(wgid);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
        }

        function updateWidget (wgid, widget) {
            widgetService.updateWidget(wgid, widget);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
        }
    }
})();