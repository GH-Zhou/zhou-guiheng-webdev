(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService, $rootScope) {

        var vm = this;

        vm.login = login;

        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
            userService
                // .findUserByCredentials(username, password)
                .login(username, password)
                .then(succeed, handleError);
            // success func. and error func.

            function handleError() {
                vm.message = "Sorry, no matching username and password is found. Please try again.";
            }

            function succeed (found) {
                if (found !== null) {
                    // vm.message = "Welcome " + username;
                    // $rootScope.currentUser = found;
                    $location.url('/profile');
                } else {
                    vm.message = "Sorry, no matching username and password is found. Please try again.";
                }
            }

        }}
})();