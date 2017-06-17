(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController ($routeParams,
                                   $location,
                                   widgetService,
                                   currentUser,
                                   $timeout) {
        var vm = this;

        vm.uid = currentUser._id;
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

                    if (vm.widget.type === "HEADING") {
                        $timeout(function () {
                            vm.options = [{
                                size: "1",
                                title: "1 (Largest)"
                            }, {
                                size: "2",
                                title: "2 (Very Large)"
                            }, {
                                size: "3",
                                title: "3 (Large)"
                            }, {
                                size: "4",
                                title: "4 (Small)"
                            }, {
                                size: "5",
                                title: "5 (Very Small)"
                            }, {
                                size: "6",
                                title: "6 (Smallest)"
                            }];
                        });
                        // initialize the selection
                        vm.widget.size = "" + widget.size;
                    }
                });

        }
        init();

        function deleteWidget (wgid) {
            widgetService
                .deleteWidget(wgid)
                .then(function (){
                    $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                });
        }

        function updateWidget (wgid, widget) {
            if (widget.name === null || widget.name === '' || typeof widget.name === 'undefined') {
                vm.error = "Name required!";
                vm.submitted = true;
                return;
            }
            widgetService
                .updateWidget(wgid, widget)
                .then(function (){
                    $location.url('/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                });
        }
    }
})();