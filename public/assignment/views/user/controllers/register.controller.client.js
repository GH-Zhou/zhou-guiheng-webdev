(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {

        var vm = this;

        vm.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                vm.error = 'Username cannot be empty!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                vm.error = 'Password cannot be empty!';
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                vm.error = 'Verifying Password cannot be empty!';
                return;
            }

            if (password !== password2) {
                vm.error = "Passwords must match!";
                return;
            }
            var found = userService.findUserByUsername(username);

            if (found !== null) {
                // vm.message = "Welcome " + username;
                vm.error = "Sorry, the username you just picked is already taken.";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();