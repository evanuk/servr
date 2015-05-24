var jwt = require('jsonwebtoken');


var bodyParser = require('body-parser');
var config = require('../../config');
var User = require('../models/user');

module.exports = function(app, express){
  var router = express.Router();

  router.post('/', function(req, res){
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user){
      if(err) throw err;

      //no user with that username found
      if(!user){
        res.json({ success: false, message: 'Authentication failed. User not found '});
      } else if (user){

          var validPassword = user.comparePassword(req.body.password);

          if(!validPassword){
            res.json({ success: false, message: 'Authentication failed! Wrong password' });
          } else{

              //if user is found and password is right
              //create a token
              var token = jwt.sign({
                name: user.name,
                username: user.username
              }, config.secretSauce, {
                expiresInMinutes: 1440 //expires in 24 hours
              });

              //return the information including token as json
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
          }
      }
    });
  });

  return router;
}
