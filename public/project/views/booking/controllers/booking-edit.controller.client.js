(function () {
    angular
        .module('Project')
        .controller('EditBookingController', EditBookingController);

    function EditBookingController ($routeParams,
                                    $location,
                                    currentUser,
                                    bookingService,
                                    userService) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.bid = $routeParams['bookingId'];

        vm.deleteBooking = deleteBooking;
        vm.updateBooking = updateBooking;
        vm.logout = logout;

        function init() {
            // bookingService
            //     .findAllBookingsForUser(vm.uid)
            //     .then(function (bookings) {
            //         vm.bookings = angular.copy(bookings);
            //         // vm.oldPages = angular.copy(vm.pages);
            //     });
            bookingService
                .findBookingById(vm.bid)
                .then(function (booking) {
                    console.log(booking);
                    vm.booking = booking;
                    vm.oldBooking = angular.copy(vm.booking);
                });
        }
        init();

        function deleteBooking (bookingId) {
            bookingService
                .deleteBooking(bookingId)
                .then(function (){
                    $location.url('/booking');
                });
        }

        function updateBooking (bookingId, booking) {
            // if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
            //     vm.error = "Name required!";
            //     vm.submitted = true;
            //     return;
            // }
            bookingService
                .updateBooking(bookingId, booking)
                .then(function (){
                    $location.url('/booking');
                });
        }

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
    }
})();