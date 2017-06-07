(function () {
    angular
        .module('Project')
        .controller('FlightStatusController', FlightStatusController);

    function FlightStatusController ($routeParams,
                                     $location,
                                     FlightStatusService) {
        var vm = this;
        // vm.getFlightStatus = getFlightStatus;

        vm.flightNumber = $routeParams['flightNumber'];
        vm.date = $routeParams['date'];

        function init() {
            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/flightstatus/';

            var bearer_token = "rtfkyfuhtxaxmp6s33xndd25";

            url += vm.flightNumber + '/' + vm.date;

            FlightStatusService
                .getFlightStatus(url, bearer_token)
                .then(function (attributes){
                    vm.departureFrom = attributes.departureFrom;
                    vm.departureTimeLocal = attributes.departureTimeLocal;
                    vm.departureTimeStatus = attributes.departureTimeStatus;
                    vm.gateDeparture = attributes.gateDeparture;
                    vm.arrivalAt = attributes.arrivalAt;
                    vm.arrivalTimeLocal = attributes.arrivalTimeLocal;
                    vm.arrivalTimeStatus = attributes.arrivalTimeStatus;
                    vm.gateArrival = attributes.gateArrival;
                    vm.operatingFlightNumber = attributes.operatingFlightNumber;
                    vm.aircraftCode = attributes.aircraftCode;
                    vm.flightStatus = attributes.flightStatus;
                });
        }
        init();

        // function getFlightStatus(flightNumber, date) {
        //
        // }

    }
})();