(function () {
    angular
        .module('Project')
        .controller('ScheduleListController', ScheduleListController);

    function ScheduleListController ($routeParams, currentUser, scheduleService, userService) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.logout = logout;

        function init() {
            scheduleService
                .findAllSchedulesForUser(vm.uid) // for crew
                .then(function (schedules) {
                    vm.schedules = schedules;
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