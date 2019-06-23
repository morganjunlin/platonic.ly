const router = require('express').Router()
const controller = require('./controller.js')

//USERS: create account/login/edit account
router
  .route('/user')
  .get(controller.getAll)
  .post(controller.makePost)

//POSTS: create post GET/edit post PATCH/see all posts GET/ see one post GET
router
  .route('/post/:id')
  .get(controller.getOnePost)
  .delete(controller.deleteOnePost)
  .patch(controller.patchPost)

//ATTENDEES: post to attendees/ get attendees/ (confirm/deny) patch boolean
router
  .route('/attendees')
  .post(controller.makeAttendeesPost)
  .get(controller.getAllAttendees)

//ATTENDEES: confirm/deny (boolean)
router
  .route('/attendees/:id')
  .patch(controller.confirmAttendees)

module.exports = router;