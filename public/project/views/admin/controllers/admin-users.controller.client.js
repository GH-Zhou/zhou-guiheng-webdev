(function () {
    angular
        .module('Project')
        .controller('AdminUserController', adminUserController);

    function adminUserController(userService, currentUser) {
        var vm = this;

        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.user = currentUser;

        function init() {
            findAllUsers();
        }
        init();

        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function selectUser(user) {
            vm.user = angular.copy(user);
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    vm.users = users;
                });
        }

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
    }
})();