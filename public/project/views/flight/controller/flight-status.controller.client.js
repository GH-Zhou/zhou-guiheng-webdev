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

        vm.logout = logout;

        function init() {
            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/flightstatus/';

            var bearer_token = "ybm9gf3xw7ezqpzv9uwf8y32";

            url += vm.flightNumber + '/' + vm.date;

            flightService
                .getFlightStatus(url, bearer_token)
                .then(function (flight){
                    vm.flight = flight;
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