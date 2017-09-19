var express = require("express"),
  router  = express.Router();

var Club = require("../models/Club.js");
var User = require("../models/User.js");

router.post("/:idCreator", function(req, res){
  var new_club = req.body;
  User.findById(req.params.idCreator, function(err, user){
    if(err){
      return res.status(400).json(err);
    }
    if(!user){
      return res.status(400).json({message:"That user doesnt exist"});
    }

    new_club.ids_admin = [req.params.idCreator];
    new_club.members = [req.params.idCreator];
    new_club.messages = new Array();

    Club.create(new_club, function(err, inserted_club){
      if(err){
        return res.status(400).json(err).end();
      }

      res.status(200).json(inserted_club);
    });
  });
});

router.put("/:id", function(req, res){
  var club = req.body;
  Club.update(req.params.id, club, function(err, updatedClub){
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(updatedClub);
  });
});

router.get("/keywords",function(req, res){
  //Comma separated kewwords
  var keywords = req.query.keywords.split(",");
  Club.findByKeywords(keywords, function(err, clubs){
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(clubs);
  });
});

router.get("/", function(req, res){
  Club.find(function(err, users){
    if(err) return res.status(400).json(err);
    console.log(users);
    res.status(200).json(users);
  });
});

router.get("/:id", function(req, res){
  Club.findById(req.params.id, function(err, club){
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(club);
  });
});

router.delete("/:id/members/:idAdmin/:idMember", function(req, res){
  Club.findById(req.params.id, function(err, club){
    //Possible errors
    if(err) return res.status(400).json(err);
    if(!club) return res.status(400).json({messge: "This club doesn't exist"});
    if(!club.ids_admin.includes(req.params.idAdmin)) return res.status(400).json({message:"You don't have permission to remove users from this group"});

    var members = club.members;
    var admins  = club.ids_admin;
    var indexRemoveM = members.indexOf(req.params.idMember);
    var indexRemoveA = admins.indexOf(req.params.idMember);

    admins.splice(indexRemoveA, 1);

    if(indexRemoveM > -1 && admins.length > 0){
      members.splice(indexRemoveM, 1);
      Club.update(club._id, {members:members} , function(err, updatedClub){
        // DEBERÍA MANEJAR EL ERROR
        res.status(200).json(updatedClub.members);
      });
    } else if(admins.length === 0){
      res.status(400).json({message:"You can't delete the last admin of a club"});
    } else {
      res.status(400).json({messge: "That user isn't in the club"});
    }
  });
});

router.post("/:id/members", function(req, res){
  var admin = req.body.admin;
  var newUser = req.body.newUser;

  User.findById(newUser, function(err, user){
    // DEBERÍA MANEJAR EL ERROR
    if(!user){
      res.status(400).json({message:"That user doesnt exist"});
    }
    Club.findById(req.params.id, function(err, club){
      if(err){
        res.status(400).json(err);
      } else {
        if(club){
          if(!club.ids_admin.includes(admin)){
            return res.sendStatus(403);
          }
          var members = club.members;
          if(members){
            members.push(newUser);
          }
          else {
            members = [newUser];
          }
          Club.update(club._id, {members:members}, function(err, club){
            if(err){
              res.status(400).json(err);
            } else {
              res.status(200).json(club);
            }
            
          });
        }
        else {
          var error = {message:"This club doesnt exist"};
          res.status(400).json(error);
        }
      }
    });
  });
});

router.post("/:id/admins", function(req, res){
  var admin = req.body.admin;
  var newAdmin = req.body.newUser;

  User.findById(newAdmin, function(err, user){
    // DEBERÍA MANEJAR EL ERROR
    if(!user){
      return res.status(400).json({message:"That user doesnt exist"});
    }
    Club.findById(req.params.id, function(err, club){
      if(err){
        return res.status(400).json(err);
      } else {
        if(club){
          if(!club.ids_admin.includes(admin)){
            return res.sendStatus(403);
          }

          var admins = club.ids_admin;
          admins.push(newAdmin);

          if(!club.members.includes(newAdmin)){
            club.members.push(newAdmin);
          }

          Club.update(club._id, {ids_admin:admins, members: club.members}, function(err, club){
            if(err){
              return res.status(400).json(err);
            } else {
              res.status(200).json(club);
            }
            
          });
        }
        else {
          var error = {message:"This club doesnt exist"};
          res.status(400).json(error);
        }
      }
    });
  });
});

//Adds a message and return the new mesage list
router.post("/:id/messages", function(req, res){
  var message = req.body;
  message.timestamp = new Date();
  Club.findById(req.params.id, function(err, club){
    if(err) return res.status(400).json(err).end();
    if(!club) return res.status(400).json({message:"That club doesn't exist"}).end();

    User.findById(message.sender, function(err, user){
      if(err) return res.status(400).json(err).end();
      if(!user) return res.status(400).json({message:"That user doesn't exist"}).end();
      if(!club.members.includes(message.sender)){
        return res.status(400).json({message:"That user can't post messages in this club"}).end();
      } else {
        message.sender_name = user.name;
        club.messages.push(message);

        Club.update(club._id, {messages:club.messages}, function(err, updatedClub){
          if(err) return res.status(400).json(err).end();
          res.status(200).json(updatedClub.messages);
        });
      }
    });

  });
});

module.exports = router;
