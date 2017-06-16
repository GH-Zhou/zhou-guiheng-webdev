(function (){
    angular
        .module("WhiteBoardApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var service = {
            createUser: createUser,
            findUserByUsername: findUserByUsername
        };
        return service;

        function createUser(user, callback)
        {
            $http.post("/api/user", user)
                 .then(callback)
        }

        function findUserByUsername(username, callback){
            $http.get("/api/user/" + username)
                .then(callback)
        }
    }
})();