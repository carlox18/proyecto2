var express = require("express"),
router  = express.Router();

var User = require("../models/User.js");

router.post("/", function(req, res){

  var new_user = req.body;
  new_user.messages = new Array();

  User.create(new_user, function(err, inserted_user){
    if(err){
      return res.status(400).json({
        error:err
      });
    } else {
      res.status(200).json(inserted_user);
    }
    
  });
});

router.put("/:id", function(req, res){
  var user = req.body;
  User.update(req.params.id, user, function(err, updatedUser){
    if(err){
      return res.status(400).json({error:err});
    }
    res.status(200).json(updatedUser);
  });
});
router.post("/login", function(req, res){
  User.findByEmail(req.body.email,function(err,user){
    if(err){
      console.log("error de mail")
      return res.status(400).json({error:err});
    }
    if(!user) return res.status(206).json({message:"That user doesn't exist"}).end();
  User.findByPass(req.body.password,function(err,userMail){
    if(err){
      console.log("error de pass")
      return res.status(400).json({error:err});
    }
    if(!userMail) return res.status(204).json({message:"Wrong Password"}).end();
  console.log("encontro pass" + userMail)
  res.status(200).json(userMail);
})
});
});

router.get("/:id", function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      return res.status(400).json({error:err});
    }
    res.status(200).json(user);
  });
});

router.get("/:idClub", function(req, res){
  User.findByClub(req.params.idClub, function(err, users){
    if(err){
      return res.status(400).json({error:err});
    }
    res.status(200).json(users);
  });
});

//Adds a message and return the new mesage list
router.post("/:id/messages", function(req, res){
  var message = req.body;
  message.timestamp = new Date();
  User.findById(req.params.id, function(err, user){
    if(err) return res.status(401).json(err).end();
    if(!user) return res.status(400).json({message:"That user doesn't exist"}).end();

    User.findById(message.sender, function(err, sender){
      if(err) return res.status(402).json(err).end();
      if(!sender) return res.status(400).json({message:"That user doesn't exist"}).end();

      message.sender_name = sender.name;
      user.messages.push(message);

      User.update(user._id, {messages:user.messages}, function(err, updatedUser){
        if(err) return res.status(403).json(err).end();
        res.status(200).json(updatedUser.messages);
      });
    });

  });
});

module.exports = router;