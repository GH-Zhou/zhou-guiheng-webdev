var app = require('../../express');
var flightModel = require('../models/flight/flight.model.server');

app.post('/api/flight/booking/:bookingId', createFlight);
app.get('/api/flights/booking/:bookingId', findAllFlightsForBooking);
app.get('/api/flight/:flightId', findFlightById);
app.put('/api/flight/:flightId', updateFlight);
app.delete('/api/flight/:flightId', deleteFlight);
app.get('/api/flight/:carrier/:flightNumber/:departureTime', findFlightByFlightInfo);
app.post('/api/flight/:flightId/:bookingId', addBooking);
app.delete('/api/flight/:bookingId', deleteBooking);
app.post('/api/flight/:flightId/:scheduleId', addSchedule); // ADMIN
app.delete('/api/flight/:scheduleId', deleteSchedule); // ADMIN


function createFlight(req, res) {
    var flight = req.body;
    var bookingId = req.params.bookingId;
    flightModel
        .createFlight(bookingId, flight)
        .then(function (flight) {
            res.json(flight);
        }, function (err) {
            res.send(err);
        });
}

function findAllFlightsForBooking(req, res) {
    var bookingId = req.params.bookingId;
    flightModel
        .findAllFlightsForBooking(bookingId)
        .then(function (flights) {
            res.json(flights);
        }, function (err) {
            res.send(err);
        });
}

function findFlightById(req, res) {
    var flightId = req.params.flightId;
    flightModel
        .findFlightById(flightId)
        .then(function (flight) {
            res.json(flight);
        }, function (err) {
            res.send(err);
        });
}

function updateFlight(req, res) {
    var newFlight = req.body;
    var flightId = req.params.flightId;
    flightModel
        .updateFlight(flightId, newFlight)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteFlight(req, res) {
    var flightId = req.params.flightId;

    flightModel
        .deleteFlight(flightId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function findFlightByFlightInfo(req, res) {
    var carrier = req.params.carrier;
    var flightNumber = req.params.flightNumber;
    var departureTime = req.params.departureTime;

    flightModel
        .findFlightByFlightInfo(carrier, flightNumber, departureTime)
        .then(function (flight) {
            res.json(flight);
        }, function () {
            flight = null;
            res.send(flight);
        });
}

function addBooking(req, res) {
    var flightId = req.params.flightId;
    var bookingId = req.params.bookingId;

    flightModel
        .addBooking(flightId, bookingId)
        .then(function (flight) {
            res.json(flight);
        }, function (err) {
            res.send(err);
        });
}

function deleteBooking(req, res) {
    var bookingId = req.params.bookingId;

    flightModel
        .deleteBooking(bookingId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function addSchedule(req, res) {
    var flightId = req.params.flightId;
    var scheduleId = req.params.scheduleId;

    flightModel
        .addSchedule(flightId, scheduleId)
        .then(function (flight) {
            res.json(flight);
        }, function (err) {
            res.send(err);
        });
}

function deleteSchedule(req, res) {
    var scheduleId = req.params.scheduleId;

    flightModel
        .deleteSchedule(scheduleId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}