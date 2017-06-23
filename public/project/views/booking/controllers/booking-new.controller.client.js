(function () {
    angular
        .module('Project')
        .controller('NewBookingController', NewBookingController);

    function NewBookingController ($routeParams,
                                   $location,
                                   currentUser,
                                   bookingService,
                                   flightService,
                                   userService) {
        var vm = this;

        if ($routeParams.username === null || typeof $routeParams.username === 'undefined') {
            vm.uid = currentUser._id;
        } else {
            vm.other_username = $routeParams.username;
            userService
                .findUserByUsername(vm.other_username)
                .then(function (user) {
                    vm.uid = user._id;
                });
        }
        vm.user = currentUser;
        vm.createBooking = createBooking;
        vm.getAvailableFlights = getAvailableFlights;
        vm.logout =logout;

        function createBooking (uid, schedule) {
            var booking = {
                dateCreated: new Date()
            };

            bookingService
                .createBooking(uid, booking)
                .then(function (booking) {
                    console.log(booking);
                    var bookingId = booking._id;

                    var flightObj = {
                        departure_airport: schedule.Flight.Departure.AirportCode,
                        departure_scheduled_time: schedule.Flight.Departure.ScheduledTimeLocal.DateTime,
                        departure_terminal: schedule.Flight.Departure.Terminal.Name,
                        arrival_airport: schedule.Flight.Arrival.AirportCode,
                        arrival_scheduled_time: schedule.Flight.Arrival.ScheduledTimeLocal.DateTime,
                        arrival_terminal: schedule.Flight.Arrival.Terminal.Name,
                        marketing_carrier: schedule.Flight.MarketingCarrier.AirlineID,
                        marketing_flight_number: schedule.Flight.MarketingCarrier.FlightNumber,
                        equipment: schedule.Flight.Equipment.AircraftCode,
                        journey_duration: schedule.TotalJourney.Duration
                    };

                    var carrier = flightObj.marketing_carrier;
                    var flightNumber = flightObj.marketing_flight_number;
                    var departureTime = flightObj.departure_scheduled_time;

                    flightService
                        .findFlightByFlightInfo(carrier, flightNumber, departureTime)
                        .then(function (flight) {
                            if (flight === null || flight === '' || typeof flight === 'undefined') {
                                flightService
                                    .createFlight(bookingId, flightObj) // create a new flight and add reference
                                    .then(function () {
                                        if ($routeParams.username === null || typeof $routeParams.username === 'undefined') {
                                            $location.url('/booking');
                                        } else {
                                            $location.url('/admin/booking');
                                        }
                                    });
                            } else {
                                bookingService
                                    .addFlight(bookingId, flight._id) // add reference only
                                    .then(function () {
                                        if ($routeParams.username === null || typeof $routeParams.username === 'undefined') {
                                            $location.url('/booking');
                                        } else {
                                            $location.url('/admin/booking');
                                        }
                                    });
                            }
                        });
                });
        }

        function getAvailableFlights (origin, destination, date, directFlights) {
            vm.oldOrigin = angular.copy(origin);
            vm.oldDestination = angular.copy(destination);
            var dd = ((date.getDate()<10) ? '0':'' ) + date.getDate();
            //January is 0!
            var mm = ((date.getMonth()<9) ? '0':'' ) + (date.getMonth() + 1);
            var yyyy = date.getFullYear();

            date = yyyy +'-' + mm + '-' + dd;
            vm.dateFormat = date;

            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/schedules/';

            var bearer_token = "ybm9gf3xw7ezqpzv9uwf8y32";

            url += origin + '/' + destination + '/' + date + "?limit=100&directFlights=" + directFlights;

            flightService
                .getAvailableFlights(url, bearer_token)
                .then(function (schedules){
                    console.log(schedules);
                    vm.schedules = schedules;
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