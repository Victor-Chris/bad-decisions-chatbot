var loki = require('lokijs');
var db = new loki('badnews');
var users = db.addCollection('users');

export const userID = String(Math.random());

users.insert({
    id: userID,
    total_followers: 0,
    new_followers: 0,
    trust: 0
})

export var userData = users.findOne({ id: userID });

export default users;