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
            vm.widgets = widgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        function createWidget (widgetType) {
            widgetId = widgetService.createWidget(widgetType, vm.pid);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/' + widgetId);
        }

    }
})();