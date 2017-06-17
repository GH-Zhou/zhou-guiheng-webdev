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

            var bearer_token = "q5exx5d6tvxkvc35y8bje9az";

            url += vm.flightNumber + '/' + vm.date;

            FlightStatusService
                .getFlightStatus(url, bearer_token)
                .then(function (flight){
                    vm.flight = flight;
                });
        }
        init();

        // function getFlightStatus(flightNumber, date) {
        //
        // }

    }
})();