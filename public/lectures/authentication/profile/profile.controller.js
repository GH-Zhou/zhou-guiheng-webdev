(function (){
    angular
        .module("WhiteBoardApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,
                               $scope,
                                $location,
                                UserService) {
        var username = $routeParams.username;
        $scope.username = username;
        UserService.findUserByUsername(username, function(user){
            $scope.user = user.data;
        });

        $scope.update = function(user) {
            console.log(user);
        }

    }
})();