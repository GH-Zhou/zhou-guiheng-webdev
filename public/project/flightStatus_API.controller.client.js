(function () {
    angular
        .module('Project')
        .controller('FlightStatusController', FlightStatusController);

    function FlightStatusController ($routeParams,
                                     $location,
                                     FlightStatusService) {
        var vm = this;
        vm.getFlightStatus = getFlightStatus;

        vm.flightNumber = $routeParams['flightNumber'];
        vm.date = $routeParams['date'];

        function getFlightStatus(flightNumber, date) {
            vm.oldFlightNumber = angular.copy(flightNumber);
            var dd = ((date.getDate()<10) ? '0':'' ) + date.getDate();
            //January is 0!
            var mm = ((date.getMonth()<9) ? '0':'' ) + (date.getMonth() + 1);
            var yyyy = date.getFullYear();

            date = yyyy +'-' + mm + '-' + dd;
            console.log(date);

            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/flightstatus/';

            var bearer_token = "6xy9gr7x2eprcw7k2mxdn496";

            url += flightNumber + '/' + date;

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

    }
})();