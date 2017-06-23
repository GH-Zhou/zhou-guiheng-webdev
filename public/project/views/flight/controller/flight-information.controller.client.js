(function () {
    angular
        .module('Project')
        .controller('FlightInformationController', flightInformationController);

    function flightInformationController ($routeParams,
                                          $location,
                                          flightService,
                                          userService,
                                          currentUser) {
        var vm = this;

        vm.user = currentUser;
        vm.airport = $routeParams['airport'];
        vm.date = new Date($routeParams['date'].replace('-', '\/'));
        vm.timeStart = $routeParams['timeStart'];

        vm.getAllFlightInformationByAirport = getAllFlightInformationByAirport;
        vm.logout = logout;

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }

        function getAllFlightInformationByAirport(airport, date, time_start, flightType) {

            // handling exceptions for inputs
            if (airport === null || airport === '' || typeof airport === 'undefined') {
                vm.error1 = 'Airport field required!';
                vm.error2 = null;
                vm.error3 = null;
                vm.error4 = null;
                return;
            }

            if (date === null || date === '' || typeof date === 'undefined') {
                vm.error1 = null;
                vm.error2 = 'Date field required!';
                vm.error3 = null;
                vm.error4 = null;
                return;
            }

            if (time_start === null || time_start === '' || typeof time_start === 'undefined') {
                vm.error1 = null;
                vm.error2 = null;
                vm.error3 = 'Time Start field required!';
                vm.error4 = null;
                return;
            }

            if (flightType === null || flightType === '' || typeof flightType === 'undefined') {
                vm.error1 = null;
                vm.error2 = null;
                vm.error3 = null;
                vm.error4 = "You have to choose either Departures or Arrivals!";
                return;
            }
            vm.error1 = null;
            vm.error2 = null;
            vm.error3 = null;
            vm.error4 = null;


            // all the inputs are acceptable
            vm.flights = null;
            vm.waiting = "Please wait a second...";
            vm.oldAirport = angular.copy(airport);
            vm.oldFlightType = angular.copy(flightType);

            var dd = ((date.getDate()<10) ? '0':'' ) + date.getDate();
            //January is 0!
            var mm = ((date.getMonth()<9) ? '0':'' ) + (date.getMonth() + 1);
            var yyyy = date.getFullYear();

            date = yyyy +'-' + mm + '-' + dd;
            vm.dateFormat = date;

            var host = 'api.lufthansa.com';
            var url = 'https://'+host+'/v1/operations/flightstatus/' + flightType + '/';

            var bearer_token = "ybm9gf3xw7ezqpzv9uwf8y32";

            url += airport + '/' + date + 'T' +  time_start + "?limit=100";

            flightService
                .getAllFlightInformationByAirport(url, bearer_token)
                .then(function (flights){
                    vm.flights = flights;
                });
        }

    }
})();