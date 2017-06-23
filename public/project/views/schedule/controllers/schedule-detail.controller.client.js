(function () {
    angular
        .module('Project')
        .controller('ScheduleListController', ScheduleListController);

    function ScheduleListController ($routeParams, currentUser, scheduleService, userService) {
        var vm = this;

        vm.scheduleId = $routeParams['scheduleId'];
        vm.uid = currentUser._id;
        vm.logout = logout;

        function init() {
            scheduleService
                .findScheduleById(vm.scheduleId)
                .then(function (schedule) {
                    vm.schedule = schedule;
                });
        }
        init();

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
    }
})();