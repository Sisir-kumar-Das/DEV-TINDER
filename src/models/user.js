const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 25,
    },
    lastName: {
      type: String,
      maxLength: 25,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid Email." + val);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password.");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      min: 18,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender date is not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This the default about of the User!",
      maxLength: 200,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPassWordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPassWordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
