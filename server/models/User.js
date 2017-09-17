var db = require("./db.js"),
  ObjectId = require("mongodb").ObjectID;

/*
User represents the database methods for accesing the users collections.
{
  _id,
  nombre,
  email,
  password,
  bio,
  clubs: [clubs: ObjectID]
}
*/

var User = {};

User.findById = function(id_user, callback){
  var users = db.get().collection("users");
  users.findOne({_id:ObjectId(id_user)}, function(err, user){
    callback(err, user);
  });
};

User.findByEmail = function(email, callback){
  var users = db.get().collection("users");
  users.findOne({email:email}, function(err, user){
    callback(err, user);
  });
};

User.findByClub = function(id_club, callback){
  var users = db.get().collection("users");
  users.find({clubs:ObjectId(id_club)}).toArray(function(err, users){
    callback(err, users);
  });
};

User.create = function(user, callback){
  var users = db.get().collection("users");
  users.insertOne(user, function(err, insertedDocs){
    callback(err, user);
  });
};

User.update = function(id, changedUserFields, callback){
  var users = db.get().collection("users");
  users.findOneAndUpdate({_id:ObjectId(id)}, {$set:changedUserFields},{returnOriginal:false}, function(err, updatedUser){
    callback(err, updatedUser.value);
  });
};


module.exports = User;

