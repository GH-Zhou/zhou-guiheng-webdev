var app = require('./express');
// var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "put some text here" })); // process.env.SESSION_SECRET
app.use(passport.initialize());
app.use(passport.session()); // must be after session

app.get('/api/session', function (req, res) {
    console.log(req.session);
    res.send(req.session);
});

app.get('/api/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;

    var obj = {
        name: value
    };

    req.session[name] = obj;

    console.log(req.session);
    res.send(req.session);
});

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// var ourApp = require ("./lectures/angular/app.js");
// ourApp(app);

// require ("./test/app.js")(app);
require ("./assignment/app");

///// LECTURES
// var mongoose = require('mongoose');
// mongoose.Promise = require('q').Promise;
// var db = mongoose.connect('mongodb://localhost/test'); // for local
//
// var userSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     email: String
// }, {collection: "user"});
//
// var User = mongoose.model("User", userSchema);
// app.post("/api/user", function(req, res){
//     var user = req.body;
//     User.create(user, function(err, newUser){
//         res.json(newUser);
//     });
// });
//
// app.get("/api/user/:username", function(req, res){
//     var username = req.params.username;
//     User.find({username: username}, function(err, users){
//         res.json(users[0]);
//     });
// });



var port = process.env.PORT || 3000;

app.listen(port);