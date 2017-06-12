(function () {
    angular
        .module("Project")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/operations/flightstatus/departures/:airport/:date/:timeStart', {
                templateUrl: 'flightDepartureInfo.view.client.html',
                controller: 'FlightDepartureInfoController',
                controllerAs: 'vm'
            })
            .when('/operations/flightstatus/:flightNumber/:date', {
                templateUrl: 'flightStatus.view.client.html',
                controller: 'FlightStatusController',
                controllerAs: 'vm'
            })
    }
})();