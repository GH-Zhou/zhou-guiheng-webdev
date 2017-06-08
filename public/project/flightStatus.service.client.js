(function (){
    angular
        .module("Project")
        .service("FlightStatusService", FlightStatusService);

    function FlightStatusService($http) {

        this.getFlightStatus = getFlightStatus;

        function getFlightStatus (url, bearer_token) {
            return $http({
                url: url ,
                method: 'GET',
                headers: {
                    accept: "application/json",
                    authorization:"Bearer " + bearer_token
                }
            }).then(function(response) {
                console.log(response);
                var attributes = {};

                var departureFrom = response.data.FlightStatusResource.Flights.Flight.Departure.AirportCode;
                var departureTimeLocal = response.data.FlightStatusResource.Flights.Flight.Departure.ActualTimeLocal.DateTime;
                var departureTimeStatus = response.data.FlightStatusResource.Flights.Flight.Departure.TimeStatus.Definition;
                var gateDeparture = response.data.FlightStatusResource.Flights.Flight.Departure.Terminal.Gate + ", T" +
                                    response.data.FlightStatusResource.Flights.Flight.Departure.Terminal.Name;

                var arrivalAt = response.data.FlightStatusResource.Flights.Flight.Arrival.AirportCode;
                var arrivalTimeLocal = response.data.FlightStatusResource.Flights.Flight.Arrival.ActualTimeLocal.DateTime;
                var arrivalTimeStatus = response.data.FlightStatusResource.Flights.Flight.Arrival.TimeStatus.Definition;
                var gateArrival = response.data.FlightStatusResource.Flights.Flight.Arrival.Terminal.Gate + ", T" +
                                  response.data.FlightStatusResource.Flights.Flight.Arrival.Terminal.Name;

                var operatingFlightNumber = response.data.FlightStatusResource.Flights.Flight.OperatingCarrier.AirlineID +
                                            response.data.FlightStatusResource.Flights.Flight.OperatingCarrier.FlightNumber;
                var aircraftCode = response.data.FlightStatusResource.Flights.Flight.Equipment.AircraftCode;
                var flightStatus = response.data.FlightStatusResource.Flights.Flight.FlightStatus.Definition;

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