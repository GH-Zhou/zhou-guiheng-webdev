var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get    ('/api/user/:userId', findUserById);
app.get    ('/api/user', findUserByUsername);
app.get    ('/api/user', findUserByCredentials);
app.post   ('/api/user', createUser);
app.put    ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",   email: "alice@gmail.com"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",   email: "bob@gmail.com"},
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",   email: "charly@gmail.com"},
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",  email: "jannunzi@neu.edu"}
// ];

// all parameters send to req
function findUserById (req, res) {
    userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

    // var user = users.find(function (user) {
    //     return user._id === userId;
    // });
    // res.send(user);
}

function findUserByCredentials (req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(404);
        });
    // for (var u in users) {
    //     var user = users[u];
    //     if (user.username === username &&
    //         user.password === password) {
    //         res.json(user);
    //         return;
    //     }
    // }

}

function createUser (req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    // user._id = (new Date()).getTime() + "";
    // user.created = new Date();
    // users.push(user);
}

function updateUser (req, res) {
    var newUser = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, newUser)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });

    // for (var u in users) {
    //     if (users[u]._id === userId) {
    //         users[u] = user;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
}

function deleteUser (req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });

    // var user = users.find(function (user) {
    //    return user._id === userId;
    // });
    // var index = users.indexOf(user);
    // users.splice(index, 1);
    // res.sendStatus(200);
}

function findUserByUsername (req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function () {
            user = null;
            res.send(user);
        });
    // for (var u in users) {
    //     var user = users[u];
    //     if (user.username === username) {
    //         res.json(user);
    //         return;
    //     }
    // }
    // user = null;
    // res.send(user);
}