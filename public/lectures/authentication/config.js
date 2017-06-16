(function(){
    angular
        .module("WhiteBoardApp")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("/home", {templateUrl: "home.html"})
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {templateUrl: "login.view.html"})
            .when("/profile/:username", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController"
            })
            .otherwise({redirectTo: "/home"})
    }
})();