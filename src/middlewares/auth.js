const adminAuth = (req, res, next) => {
  const id = req.body.id;
  if (id !== "1000") {
    res.status(401).send("You are not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
