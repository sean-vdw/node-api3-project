const { getById } = require('../users/users-model');

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} : [${req.method}] at ${req.url}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        next ({ status: 404, message: "user not found" })
      }
    })
    .catch(next);
};

function validateUser(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.trim();
    next();
  } else {
    next({ status: 400, message: "missing required name field"});
  }
};

function validatePost(req, res, next) {
  if (req.body.text) {
    req.body.text = req.body.text.trim();
    next();
  } else {
    next({ status: 400, message: "missing required text field"});
  }
};

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}