(function () {
    angular
        .module('Project')
        .controller('MessageController', MessageController);

    function MessageController($location, $routeParams, messageService, currentUser, userService) {

        var vm = this;

        // vm.uid = currentUser._id;
        vm.user = currentUser;
        vm.other_username = $routeParams.username;

        vm.createMessage = createMessage;
        // vm.updateMessage = updateMessage;
        vm.deleteMessage = deleteMessage;
        vm.logout = logout;

        function init() {
            messageService
                .findMessagesBetweenTwoUsers(vm.user.username, vm.other_username)
                .then(function (messages){
                    vm.messages = messages;
                });

            userService
                .findUserByUsername(vm.other_username)
                .then(function (user) {
                    if (user === null || typeof user === 'undefined') {
                        vm.error = "Sorry, we couldn't find the user you requested.";
                    } else {
                        vm.error = null;
                    }
                });
        }
        init();

        function createMessage(message) {
            // vm.message_out = "";
            var obj = {
                text: message,
                from: vm.user.username,
                to: vm.other_username,
                date: new Date()
            };
            messageService
                .createMessage(obj)
                .then(init);
        }

        // function updateMessage(message) {
        //
        // }

        function deleteMessage(message) {
            messageService
                .deleteMessage(message._id)
                .then(init);
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