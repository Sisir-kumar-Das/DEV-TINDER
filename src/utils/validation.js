const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || lastName.length < 4) {
    throw new Error("Name is not valid");
  }
};

module.exports = {
  validateSignUpData,
};
