var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  // dont store the password as plain text
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
})


UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },
  toJson: function(){
    var obj = this.toObject();
    // toObject is built into Mongoose converts from document to JS Object
    // what is returned by find() etc by mongoose LOOKS like a JS object but it's really a
    // document that has add'l methods on it (.save, .remove). toObject removes those
    delete obj.password;
    return obj;
  }
};

module.exports = mongoose.model('user', UserSchema);
