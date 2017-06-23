(function () {
    angular
        .module('Project')
        .controller('AdminScheduleController', adminScheduleController);

    function adminScheduleController(scheduleService, currentUser, flightService, userService) {
        var vm = this;

        vm.createSchedule = createSchedule;
        vm.deleteSchedule = deleteSchedule;
        vm.selectSchedule = selectSchedule;
        vm.updateSchedule = updateSchedule;
        vm.findAllCrew = findAllCrew;
        vm.findAllFlights = findAllFlights;
        vm.selectCrew = selectCrew;
        vm.selectFlight = selectFlight;
        vm.logout = logout;
        vm.user = currentUser;

        function init() {
            findAllSchedules();
            findAllCrew();
            findAllFlights();
        }
        init();

        function createSchedule(username, flight) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    userId = user._id;

                    carrier = flight.carrier_flight_number.splice(0,2);
                    flightNumber = flight.marketing_flight_number.splice(2);
                    departureTime = flight.departure_scheduled_time;

                    flightService
                        .findFlightByFlightInfo(carrier, flightNumber, departureTime)
                        .then(function (flight) {
                            flightId = flight._id;
                            var scheduleObj = {
                                _user: userId,
                                dateCreated: new Date(),
                                flights: [flightId]
                            };

                            scheduleService
                                .createSchedule(userId, scheduleObj)
                                .then(findAllSchedules);
                        }, function (err) {
                            return err;
                        });
                });
        }

        function deleteSchedule(schedule) {
            vm.selected = false;
            scheduleService
                .deleteSchedule(schedule._id)
                .then(findAllSchedules);
        }

        function selectSchedule(schedule, index) {
            vm.selected = true;
            vm.schedule = angular.copy(schedule);
            vm.oldFlight = angular.copy(vm.flights[index]);
            vm.oldUser = angular.copy(vm.users[index]);
        }

        function updateSchedule(schedule, index) {
            vm.selected = false;
            scheduleId = schedule._id;
            userService
                .deleteSchedule(scheduleId)
                .then(function() {

                    flightService
                        .deleteSchedule(scheduleId)
                        .then(function() {

                            var newSchedule = {
                                _user: vm.users[index]._id,
                                flights: [vm.flights[index]._id]
                            };

                            scheduleService
                                .updateSchedule(scheduleId, newSchedule)
                                .then(findAllSchedules);
                        });
                });
        }

        function findAllSchedules() {
            scheduleService
                .findAllSchedules()
                .then(function (schedules) {
                    vm.schedules = schedules;

                    vm.flights = [];
                    loadFlights(vm.schedules);

                    vm.users = [];
                    loadUsers(vm.schedules);
                });
        }

        function loadFlights (schedules) {
            for (var s in schedules) {
                subflights = [];
                for (var f in schedules[s].flights) {
                    flightService
                        .findFlightById(schedules[s].flights[f])
                        .then(function (flight) {
                            subflights.push(flight);
                        });
                }
                vm.flights.push(subflights);
            }
        }

        function loadUsers (schedules) {
            for (var s in schedules) {
                userService
                    .findUserById(schedules[s]._user)
                    .then(function (_user) {
                        vm.users.push(_user);
                    });
            }
        }
        function findAllCrew () {
            userService
                .findAllCrew()
                .then(function (crew) {
                    vm.crew = crew;
                });
        }

        function findAllFlights () {
            flightService
                .findAllFlights()
                .then(function (flights) {
                    vm.flights = flights;
                });
        }

        function selectCrew (_crew) {
            vm._user = _crew;
        }

        function selectFlight (flight) {
            vm._flight = angular.copy(flight);
            vm._flight.carrier_flight_number = flight.marketing_carrier + flight.marketing_flight_number;
            vm._flight.departure_scheduled_time = new Date(flight.departure_scheduled_time)
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