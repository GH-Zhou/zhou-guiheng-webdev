(function () {
    angular
        .module('Project')
        .controller('ScheduleDetailController', ScheduleDetailController);

    function ScheduleDetailController ($routeParams,
                                       currentUser,
                                       scheduleService,
                                       userService,
                                       bookingService,
                                       flightService) {
        var vm = this;

        vm.scheduleId = $routeParams['scheduleId'];
        vm.user = currentUser;
        vm.uid = currentUser._id;
        vm.logout = logout;

        function init() {
            scheduleService
                .findScheduleById(vm.scheduleId)
                .then(function (schedule) {
                    vm.schedule = schedule;

                    vm.users = [];
                    vm.crew =[];

                    loadCrewAndManifest(vm.schedule);
                });
        }
        init();

        function loadCrewAndManifest (schedule) {
            flightService
                .findFlightById(schedule.flights[0])
                .then(function (flight) {
                    vm.flight = flight;

                    for (var b in flight.bookings) {
                        bookingService
                            .findBookingById(flight.bookings[b])
                            .then(function (booking) {
                                userService
                                    .findUserById(booking._user)
                                    .then(function (user) {
                                        vm.users.push(user);
                                    })
                            });
                    }

                    for (var s in flight.schedules) {
                        scheduleService
                            .findScheduleById(flight.schedules[s])
                            .then(function (schedule) {
                                userService
                                    .findUserById(schedule._user)
                                    .then(function (user) {
                                        vm.crew.push(user);
                                    });
                            })
                    }
                });
        }

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
    }
})();