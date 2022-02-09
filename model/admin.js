const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    unique: [true, "Email already exists"],
    validate: {
      validator: (val) => {
        validator.isEmail(val);
      },
      message: "Enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minLength: [8, "Password must have at least 8 characters"],
    maxLength: [15, "Password cannot exceeed 15 charaters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "superAdmin"],
    default: "admin",
  },
});

adminSchema.pre("save", async function (next) {
  //Check if the password was modified to avoid rehashing an already hashed password
  if (!this.isModified("password")) return next();
  //Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.checkPassword = async function (password, hash) {
 return await bcrypt.compare(password, hash);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
