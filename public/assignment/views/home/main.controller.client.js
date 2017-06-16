(function () {
    angular
        .module('WebAppMaker')
        .controller('MainController', MainController);

    function MainController(currentUser, userService) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.logout = logout;

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
    }
})();