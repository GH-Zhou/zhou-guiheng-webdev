(function (){
    angular
        .module("WhiteBoardApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,
                                $location,
                                UserService) {
        $scope.register = function(user){
            UserService.createUser(user, function(user){
                if (user !== null){
                    $location.url("/profile/" + user.data.username);
                }
            });
        }
    }
})();