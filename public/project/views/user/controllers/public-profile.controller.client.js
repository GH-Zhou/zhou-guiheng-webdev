(function () {
    angular
        .module('Project')
        .controller('PublicProfileController', PublicProfileController);

    function PublicProfileController($location, $routeParams, userService, currentUser) {

        var vm = this;

        // vm.uid = currentUser._id;
        vm.visitor = currentUser;
        vm.username = $routeParams.username;

        function init() {
            userService
                .findUserByUsername(vm.username)
                .then(renderUser);
        }
        init();

        // function init () {
        //     renderUser(currentUser);
        // }
        // init();

        function renderUser (user) {
            vm.user = user;
        }

    }
})();