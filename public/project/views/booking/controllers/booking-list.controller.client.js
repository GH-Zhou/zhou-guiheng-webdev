(function () {
    angular
        .module('Project')
        .controller('BookingListController', BookingListController);

    function BookingListController ($routeParams, currentUser, bookingService, userService, flightService) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.user = currentUser;
        vm.logout = logout;

        function init() {
            bookingService
                .findAllBookingsForUser(vm.uid)
                .then(function (bookings) {
                    vm.bookings = bookings;
                    vm.flights = [];
                    for (var b in vm.bookings) {
                        flightService
                            .findFlightById(vm.bookings[b].flights[0])
                            .then(function (flight) {
                                vm.flights.push(flight);
                            });
                    }
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
    }
})();