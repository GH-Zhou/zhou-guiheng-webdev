var app = require('../../express');
var scheduleModel = require('../models/schedule/schedule.model.server');

app.post('/api/user/:userId/schedule', createSchedule);
app.get('/api/user/:userId/schedule', findAllSchedulesForUser);
app.get('/api/schedule/:scheduleId', findScheduleById);
app.put('/api/schedule/:scheduleId', updateSchedule);
app.delete('/api/schedule/:scheduleId', deleteSchedule);
app.post('/api/schedule/:scheduleId/:flightId', addFlight);
app.delete('/api/schedule/:flightId', deleteFlight);

function createSchedule(req, res) {
    var schedule = req.body;
    var userId = req.params.userId;
    scheduleModel
        .createSchedule(userId, schedule)
        .then(function (schedule) {
            res.json(schedule);
        }, function (err) {
            res.send(err);
        });
}

function findAllSchedulesForUser(req, res) {
    var userId = req.params.userId;
    scheduleModel
        .findAllSchedulesForUser(userId)
        .then(function (schedules) {
            res.json(schedules);
        }, function (err) {
            res.send(err);
        });
}

function findScheduleById(req, res) {
    var scheduleId = req.params.scheduleId;
    scheduleModel
        .findScheduleById(scheduleId)
        .then(function (schedule) {
            res.json(schedule);
        }, function (err) {
            res.send(err);
        });
}

function updateSchedule(req, res) {
    var newSchedule = req.body;
    var scheduleId = req.params.scheduleId;
    scheduleModel
        .updateSchedule(scheduleId, newSchedule)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteSchedule(req, res) {
    var scheduleId = req.params.scheduleId;

    scheduleModel
        .deleteSchedule(scheduleId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function addFlight(req, res) {
    var scheduleId = req.params.scheduleId;
    var flightId = req.params.flightId;

    scheduleModel
        .addFlight(scheduleId, flightId)
        .then(function (schedule) {
            res.json(schedule);
        }, function (err) {
            res.send(err);
        });
}

function deleteFlight(req, res) {
    var flightId = req.params.flightId;

    scheduleModel
        .deleteFlight(flightId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}