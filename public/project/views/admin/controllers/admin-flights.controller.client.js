(function () {
    angular
        .module('Project')
        .controller('AdminFlightController', adminFlightController);

    function adminFlightController(currentUser, flightService, userService) {
        var vm = this;

        vm.getAvailableFlights = getAvailableFlights;
        vm.createFlightOnly = createFlightOnly;
        vm.deleteFlight = deleteFlight;
        vm.selectFlight = selectFlight;
        vm.updateFlight = updateFlight;
        vm.logout = logout;
        vm.user = currentUser;

        function init() {
            findAllFlights();
        }
        init();

        function getAvailableFlights(flight) { // from API
            vm.showAvailableFlights = true;

            origin = flight.departure_airport;
            destination = flight.arrival_airport;
            date = flight.departure_scheduled_time;
            directFlights = true;

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

        function createFlightOnly(flight) {
            var carrier = flight.marketing_carrier;
            var flightNumber = flight.marketing_flight_number;
            var departureTime = flight.departure_scheduled_time;

            flightService
                .findFlightByFlightInfo(carrier, flightNumber, departureTime)
                .then(function (schedule) {

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

                    flightService
                        .createFlightOnly(flightObj) // create a new flight ONLY without adding references
                        .then(findAllFlights);

                }, function () {
                    vm.error = "Failed! No requested flight found!";
                });
        }

        function deleteFlight(flight) {
            vm.showAvailableFlights = false;
            flightService
                .deleteFlight(flight._id)
                .then(findAllFlights);
        }

        function selectFlight(flight) {
            vm.flight = angular.copy(flight);
            vm.flight.departure_scheduled_time = new Date(flight.departure_scheduled_time);
        }

        function updateFlight(flight) {
            vm.showAvailableFlights = false;

            var carrier = flight.marketing_carrier;
            var flightNumber = flight.marketing_flight_number;
            var departureTime = flight.departure_scheduled_time;

            flightService
                .findFlightByFlightInfo(carrier, flightNumber, departureTime)
                .then(function (schedule) {

                    var newFlight = {
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

                    flightService
                        .updateFlight(flight._id, newFlight)
                        .then(findAllFlights);

                }, function () {
                    vm.error = "Failed! No requested flight found!";
                });
        }

        function findAllFlights() {
            flightService
                .findAllFlights()
                .then(function (flights) {
                    vm.flights = flights;
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