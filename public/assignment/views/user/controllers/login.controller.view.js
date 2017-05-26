(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);

            if (found !== null) {
                // model.message = "Welcome " + username;
                $location.url('/user/' + found._id);
            } else {
                model.message = "Sorry, no matching username and password is found. Please try again.";
            }
        }
    }
})();