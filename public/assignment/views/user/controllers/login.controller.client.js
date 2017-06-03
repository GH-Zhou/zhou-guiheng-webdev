(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {

        var vm = this;

        vm.login = login;

        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);
            // success func. and error func.

            function handleError() {
                vm.message = "Sorry, no matching username and password is found. Please try again.";
            }

            function login (found) {
                if (found) {
                    // vm.message = "Welcome " + username;
                    $location.url('/user/' + found._id);
                } else {
                    vm.message = "Sorry, no matching username and password is found. Please try again.";
                }
            }
        }
    }
})();