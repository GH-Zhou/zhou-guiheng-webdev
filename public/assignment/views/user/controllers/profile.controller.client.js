(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, userService) {

        var model = this;

        model.uid = $routeParams['uid'];

        model.user = userService.findUserById(model.uid);

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function updateUser (userId, user) {
            userService.updateUser(userId, user);
            model.message = "Updated successfully!";
        }

        function deleteUser (userId) {
            userService.deleteUser(userId);
            $location.url('/login');
        }

    }
})();