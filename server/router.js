const router = require('express').Router()
const controller = require('./controller.js')

//USERS: create account/login/edit account
router
  .route('/user')
  .get(controller.getAll)
  .post(controller.post)

//POSTS: create post GET/edit post PATCH/see all posts GET/ see one post GET
router
  .route('/post')
  .delete(controller.deleteOne)
  .get(controller.getOne)
  .patch(controller.patch)

//ATTENDEES: post to attendees/ get attendees/ (confirm/deny) patch boolean
router
  .route('/attendees')
  .post()
  .get()
  .patch()

module.exports = router;