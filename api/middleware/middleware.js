const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} : [${req.method}] at ${req.url}`);
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = user;
      next();
    }
  } catch(err) {
    res.status(500).json({ message: "we're having problems finding the user"})
  }
};

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    req.name = name;
    next();
  }
};

function validatePost(req, res, next) {
  if (req.body) {
    next();
  } else {
    next({ status: 400, message: "missing required text field"});
  }
};

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}