(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, userService) {

        var vm = this;

        vm.uid = $routeParams['uid'];

        vm.user = userService.findUserById(vm.uid);

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser (userId, user) {
            userService.updateUser(userId, user);
            vm.message = "Updated successfully!";
        }

        function deleteUser (userId) {
            userService.deleteUser(userId);
            $location.url('/login');
        }

    }
})();