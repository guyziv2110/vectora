var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
 
var userSchema = new Schema({

    fullName:             { type: String, required: true },
    email:                { type: String, required: true },
    facebook: {
      id:                 { type: String },
      token:              { type: String },
      email:              { type: String },
      name:               { type: String },
    },
    google: {
      id:                 { type: String },
      token:              { type: String },
      email:              { type: String },
      name:               { type: String },
    }
});

userSchema.statics.findByEmailOrQuery = function(email,query,callback) {
  this.findOne( { $or:[ {email:email}, query ]}, callback);
};

module.exports = mongoose.model('User', userSchema);

