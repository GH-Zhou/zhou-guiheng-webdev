(function () {
    angular
        .module("Project")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'flightStatus_API.view.client.html',
                controller: 'FlightStatusController',
                controllerAs: 'vm'
            })
    }
})();