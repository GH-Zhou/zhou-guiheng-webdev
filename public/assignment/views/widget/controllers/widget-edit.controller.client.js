(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController ($routeParams,
                                 $location,
                                 widgetService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(vm.pid)
                .then(function (widgets) {
                    vm.widgets = widgets;
                    vm.oldWidgets = angular.copy(vm.widgets);
                });
            widgetService
                .findWidgetById(vm.wgid)
                .then(function (widget) {
                    vm.widget = widget;
                    vm.oldWidget = angular.copy(vm.widget);
                });
        }
        init();

        function deleteWidget (wgid) {
            widgetService
                .deleteWidget(wgid)
                .then(function (){
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                });
        }

        function updateWidget (wgid, widget) {
            widgetService
                .updateWidget(wgid, widget)
                .then(function (){
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                });
        }
    }
})();