const mongoose = require("mongoose");
const validator = require("validator");

const ResponseSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: [true, "Email cannot be blank"],
    validate: {
      validator: (val) => {
        validator.isEmail(val);
      },
      message: "Enter a valid email",
    },
    unique: [true, "Email already exists"],
  },
  Gender: {
    type: String,
    required: [true, "Gender cannot be emnpty"],
  },
  Phone: {
    type: String,
    required: [true, "Phone number cannot be empty"],
  },
  State: {
    type: String,
    required: [true, "State cannot be empty"],
  },
  "Level-of-Education": {
    type: String,
    enum: ["SSCE", "OND", "HND", "Undergraduate", "BSC"],
    required: [true, "Please specify your level of education"],
  },
  "Technical Skill of Interest": {
    type: String,
    required: [true, "This cannot be blank"],
  },
  "Basic Knowledge of skillset": {
    type: String,
    enum: ["Yes", "No", "Still learning"],
    required: [true, "This cannot be blank"],
  },
  Challenges: {
    type: String,
    required: [true, "This cannot be blank"],
  },
  "Past Project Details": {
    type: String,
    required: [true, "This cannot be empty"],
  },
  "Github URL": {
    type: String,
    required: [true, "Please specify your github url"],
  },
  Reason: {
    type: String,
    required: [true, "This cannot be empty"],
  },
  Terms: {
    type: String,
    required: [true, "This cannot be empty"],
  },
});

const Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;
