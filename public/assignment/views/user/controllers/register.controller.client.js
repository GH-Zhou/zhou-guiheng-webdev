(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username cannot be empty!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password cannot be empty!';
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'Verifying Password cannot be empty!';
                return;
            }

            if (password !== password2) {
                model.error = "Passwords must match!";
                return;
            }
            var found = userService.findUserByUsername(username);

            if (found !== null) {
                // model.message = "Welcome " + username;
                model.error = "Sorry, the username you just picked is already taken.";
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