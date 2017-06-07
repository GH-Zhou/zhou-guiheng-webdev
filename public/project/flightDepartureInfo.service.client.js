(function (){
    angular
        .module("Project")
        .service("FlightDepartureInfoService", FlightDepartureInfoService);

    function FlightDepartureInfoService($http) {

        this.getAllFlightInformationByAirport = getAllFlightInformationByAirport;

        function getAllFlightInformationByAirport (url, bearer_token) {
            return $http({
                url: url ,
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization:"Bearer " + bearer_token
                }
            }).then(function(response) {
                console.log(response);
                return response.data.FlightStatusResource.Flights.Flight;
            });
        }

        // $http({
        //     url: "https://api.lufthansa.com/v1/oauth/token" ,
        //     method: 'POST',
        //     data: {
        //         client_id: "4z82uenx87gw8agtm4gz569k",
        //         client_secret: "4HaRYWyzBg",
        //         grant_type: "client_credentials"
        //     }
        // });

    }
})();