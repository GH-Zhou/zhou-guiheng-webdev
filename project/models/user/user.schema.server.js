var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,

    roles: [{type: String,
        default: 'USER',
        enum: ['USER', 'CREW', 'ADMIN']}],

    facebook: {
        id:    String,
        token: String
    },

    email: String,
    phone: String,
    messages: [{type: mongoose.Schema.ObjectId, ref: "MessageModel"}],
    bookings: [{type: mongoose.Schema.ObjectId, ref: "BookingModel"}],
    schedules: [{type: mongoose.Schema.ObjectId, ref: "ScheduleModel"}],
    dateOfBirth: {type: Date, default: Date.now},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;
