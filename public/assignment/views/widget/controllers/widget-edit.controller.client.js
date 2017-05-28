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
            vm.widgets = widgetService.findWidgetsByPageId(vm.pid);
            vm.widget = widgetService.findWidgetById(vm.wgid);
        }
        init();

        vm.oldWidgets = angular.copy(vm.widgets);
        vm.oldWidget = angular.copy(vm.widget);

        function deleteWidget (wgid) {
            widgetService.deleteWidget(wgid);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
        }

        function updateWidget (wgid, widget) {
            widgetService.updateWidget(wgid, widget);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
        }
    }
})();