const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || lastName.length < 4) {
    throw new Error("Name is not valid");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFeilds = [
    "firstName",
    "lastName",
    "emaildId",
    "phototUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((feild) =>
    allowedEditFeilds.includes(feild)
  );

  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
