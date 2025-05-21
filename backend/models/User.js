const mongoose = require("mongoose");


const urlRegex = /^(https?:\/\/)(www\.)?[\w.-]+\.[a-z]{2,6}(\/[\w._~:/?%#[\]@!$&'()*+,;=-]*)?#?$/i;


const userSchema = new mongoose.Schema({
  name:{type: String,default:"Jacques Cousteau",
    min: 2,
  max: 30},
  about:{type: String,
default:"Explorador",
    min: 2,
  max: 30},
  avatar:{type: String,default:"https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg", validate: {validator: function (value) {
    return urlRegex.test(value);
},
message: "⚠️ La URL del avatar no es válida. Asegúrate de que comience con http:// o https://"}
},

email:{type: String,
  required: true,
  unique: true,
},
password:{type: String,
  required: true,
  min: 4,
  max: 30,
  select: false
}
})
  module.exports = mongoose.model("User", userSchema);