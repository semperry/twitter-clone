const monogoose = require("mongoose");
const Schema = monogoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String
    }
  },
  {
    collection: "users"
  }
);

module.exports = monogoose.model("User", userSchema);
