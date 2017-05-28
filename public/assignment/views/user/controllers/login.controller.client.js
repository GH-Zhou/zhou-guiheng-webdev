(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {

        var vm = this;

        vm.login = login;

        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);

            if (found !== null) {
                // vm.message = "Welcome " + username;
                $location.url('/user/' + found._id);
            } else {
                vm.message = "Sorry, no matching username and password is found. Please try again.";
            }
        }
    }
})();