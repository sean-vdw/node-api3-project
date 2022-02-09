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
  Users.getById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
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

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Users.remove(id)
    res.json(req.user);
  } catch(err) {
    next(err);
  }
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res, next) => {
  try {
    const newPost = await Posts.insert({ user_id: req.params.id, text: req.text});
    res.status(201).json(newPost);
  } catch(err) {
    next(err);
  }
});

module.exports = router;