const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");
const path = require("path");
const UploadFolder = String(process.env.UploadFolder);
const ImagesServerUrl = String(process.env.ImagesServerUrl);

let Users = new Schema({
  username: { type: String, required: true, unique: true },
  displayName: {type: String, required: true, unique: false},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Rank: { type: Number, required: true, default: 1 },
  biography: {type: String, default: ""},
  streamKey: { type: String },
  Preferences: {
    language: { type: String, default: "en"},
    theme: { type: String, default: "light"}
  }
}, 
{
  timestamps: true
});

Users.set('toObject', { virtuals: true });
Users.set('toJSON', { virtuals: true });


Users.virtual('ProfileImage').get(function () {
  var AbsolutePath = path.join(UploadFolder, "Users", String(this._id), "profile-image.png");
  if(fs.existsSync(AbsolutePath)){
    return ImagesServerUrl + AbsolutePath;
  }else{
    return false;
  }
});

Users.virtual('BackgroundImage').get(function () {
  var AbsolutePath = path.join(UploadFolder, "Users", String(this._id), "background-image.png");
  if(fs.existsSync(AbsolutePath)){
    return ImagesServerUrl + AbsolutePath;
  }else{
    return false;
  }
});

module.exports =  mongoose.model('User', Users);