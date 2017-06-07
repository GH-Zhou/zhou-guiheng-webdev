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
                var attributes = [];

                var departureFrom = response.data.FlightStatusResource.Flights.Flight.Departure.AirportCode;
                var departureTimeLocal = response.data.FlightStatusResource.Flights.Flight.Departure.ActualTimeLocal.DateTime;
                var terminalDeparture = response.data.FlightStatusResource.Flights.Flight.Departure.Terminal.Gate;
                var gateDeparture = response.data.FlightStatusResource.Flights.Flight.Departure.Terminal.Name;

                var arrivalAt = response.data.FlightStatusResource.Flights.Flight.Arrival.AirportCode;
                var arrivalTimeLocal = response.data.FlightStatusResource.Flights.Flight.Arrival.ActualTimeLocal.DateTime;
                var terminalArrival = response.data.FlightStatusResource.Flights.Flight.Arrival.Terminal.Gate;
                var gateArrival = response.data.FlightStatusResource.Flights.Flight.Arrival.Terminal.Name;

                var marketingFlightNumber = response.data.FlightStatusResource.Flights.Flight.MarketingCarrier.AirlineID +
                                    response.data.FlightStatusResource.Flights.Flight.MarketingCarrier.FlightNumber;

                attributes.push(departureFrom);
                attributes.push(departureFrom);
                attributes.push(departureFrom);
                attributes.push(departureFrom);
                attributes.push(departureFrom);
                attributes.push(departureFrom);
                attributes.push(departureFrom);
                attributes.push(departureFrom);

                return attributes;
            });
        }

    }
})();