var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

// var websites = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.send(err);
        });
    // website._id = (new Date()).getTime() + "";
    // websites.push(website);
    // res.send(website);
}

function findAllWebsitesForUser(req, res) {
    // var results = [];
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        }, function (err) {
            res.send(err);
        });
    // for (var v in websites) {
    //     if (websites[v].developerId === req.params.userId) {
    //         websites[v].created = new Date();
    //         websites[v].accessed = new Date();
    //         results.push(websites[v]);
    //     }
    // }
    // res.json(results);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.send(err);
        });
    // var website = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    // res.send(website);
}

function updateWebsite(req, res) {
    var newWebsite = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId, newWebsite)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });

    // for (var v in websites) {
    //     if (websites[v]._id === websiteId) {
    //         websites[v] = website;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
    // var website = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    // var index = websites.indexOf(website);
    // websites.splice(index, 1);
    // res.sendStatus(200);
}