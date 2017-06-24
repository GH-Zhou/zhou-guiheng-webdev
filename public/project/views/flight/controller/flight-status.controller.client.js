(function () {
    angular
        .module('Project')
        .controller('FlightStatusController', FlightStatusController);

    function FlightStatusController ($routeParams,
                                     $location,
                                     flightService,
                                     userService,
                                     currentUser) {
        var vm = this;
        // vm.getFlightStatus = getFlightStatus;
        vm.user = currentUser;
        vm.flightNumber = $routeParams['flightNumber'];
        vm.date = $routeParams['date'];
        vm.url = window.location.href.split('#!')[1];

        vm.logout = logout;

        function init() {
            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/flightstatus/';

            var bearer_token = "e2uksssycuwg3mr3hss2vuhq";

            url += vm.flightNumber + '/' + vm.date;

            vm.waiting = "Please wait a second...";

            flightService
                .getFlightStatus(url, bearer_token)
                .then(function (flight){
                    vm.flight = flight;
                }, function () {
                    vm.error = "Sorry, the flight status of this flight is unavailable."
                });
        }
        init();

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
        // function getFlightStatus(flightNumber, date) {
        //
        // }

    }
})();