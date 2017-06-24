(function () {
    angular
        .module('Project')
        .controller('AdminUserController', adminUserController);

    function adminUserController(userService, currentUser) {
        var vm = this;

        vm.user = currentUser;
        vm.url = window.location.href.split('#!')[1];

        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.logout = logout;


        function init() {
            findAllUsers();
        }
        init();

        function createUser(_user) {
            userService
                .createUser(_user)
                .then(findAllUsers);
        }

        function deleteUser(_user) {
            userService
                .deleteUser(_user._id)
                .then(findAllUsers);
        }

        function selectUser(_user) {
            vm._user = angular.copy(_user);
        }

        function updateUser(_user) {
            userService
                .updateUser(_user._id, _user)
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