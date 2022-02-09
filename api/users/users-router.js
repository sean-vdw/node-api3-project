const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', logger, validateUserId, (req, res, next) => {
  res.json(req.user);
});

router.post('/', logger, validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;