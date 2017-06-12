(function () {
    angular
        .module('Project')
        .controller('FlightDepartureInfoController', flightDepartureInfoController);

    function flightDepartureInfoController ($routeParams,
                                     $location,
                                     FlightDepartureInfoService) {
        var vm = this;
        vm.getAllFlightInformationByAirport = getAllFlightInformationByAirport;

        vm.airport = $routeParams['airport'];
        vm.date = new Date($routeParams['date'].replace('-', '\/'));
        vm.timeStart = $routeParams['timeStart'];

        function getAllFlightInformationByAirport(airport, date, time_start) {
            vm.oldAirport = angular.copy(airport);
            var dd = ((date.getDate()<10) ? '0':'' ) + date.getDate();
            //January is 0!
            var mm = ((date.getMonth()<9) ? '0':'' ) + (date.getMonth() + 1);
            var yyyy = date.getFullYear();

            date = yyyy +'-' + mm + '-' + dd;
            vm.dateFormat = date;

            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/flightstatus/departures/';

            var bearer_token = "7hyack5dp8b85j5mpht2m8hd";

            url += airport + '/' + date + 'T' +  time_start + "?limit=100";

            FlightDepartureInfoService
                .getAllFlightInformationByAirport(url, bearer_token)
                .then(function (flights){
                    vm.flights = flights;
                });
        }

    }
})();