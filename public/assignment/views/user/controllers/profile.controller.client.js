(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, userService) {

        var vm = this;

        vm.uid = $routeParams['uid'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;


        // vm.user = userService.findUserById(vm.uid);
        userService
            .findUserById(vm.uid)
            .then(renderUser);

        function renderUser (user) {
            vm.user = user;
        }
        function updateUser (userId, user) {
            userService
                .updateUser(userId, user)
                .then(function () {
                    vm.message = "Updated successfully!";
                });

        }

        function deleteUser (userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                });
        }

    }
})();