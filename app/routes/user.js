var bodyParser = require('body-parser');
var User = require('../models/user');
var config = require('../../config');
var protectRoutes = require('../middleware/protectRoutes');

module.exports = function(app, express){
  var router = express.Router();

  router.use(protectRoutes);

  router.route('/')

    //create a user
    .post(function(req, res){
      var user = new User();

      //set the users information
      user.name = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;

      //save the user and check for errors
      user.save(function(err){
        if(err){
          //duplicate entry
          if(err.code == 11000)
            return res.json({ success: false,
                              message: 'A user with that username already exists' });
          else
            return res.send(err);
        }

        res.json({ message: 'User created!'});
      });
    })

    //get all users
    .get(function(req, res){
      User.find(function(err, users){
        if(err) res.send(err);

        //return the users
        res.json(users);
      })
    });

  router.route('/:user_id')

    //get the user with that id
    .get(function(req, res){
      User.findById(req.params.user_id, function(err, user){
        if(err) res.send(err);

        res.json(user);
      })
    })

    .put(function(req, res){
      User.findById(req.params.user_id, function(err, user){
        if(err) res.send(err);

        //update the users info only if its new
        if(req.body.name) user.name = req.body.name;
        if(req.body.username) user.username = req.body.username;
        if(req.body.password) user.password = req.body.password;

        user.save(function(err){
          if(err) res.send(err);

          res.json({ message: 'User updated!'});
        });
      });
    })
    .delete(function(req, res){
      User.remove({
        _id: req.params.user_id
      }, function(err, user){
        if(err) res.send(err);

        res.json({ message: 'Successfully deleted!'});
      });
    });


    return router;
}
