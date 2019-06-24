const router = require('express').Router()
const controller = require('./controller.js')

//USERS: create account/login/edit account
router
  .route('/user')
    .get(controller.getUser) // allows user to log in with id/email and salted pw
    .post(controller.createUser) // allows user to create an account
    .put(controller.editUser) // allows user to edit account info

//POSTS: create post GET/edit post PATCH/see all posts GET/ see one post GET
router
  .route('/post')
    .get(controller.getAllPosts) // allows user to get all posts with search filters
    .post(controller.makeNewPost) // allows user to create a new post

//POSTS: create post GET/edit post PATCH/see all posts GET/ see one post GET
router
  .route('/post/:id')
    .get(controller.getOnePost) // allows user to view one post
    .delete(controller.deleteOnePost) // allows user to delete their post
    .patch(controller.editOnePost) // allows user to edit their post

//ATTENDEES: post to attendees/ get attendees/ (confirm/deny) patch boolean
router
  .route('/attendees')
    .post(controller.requestToBeAttendee) // allows user to request to join a single post
    .get(controller.getAllAttendees) // allows user to view attendees of a single post

//ATTENDEES: confirm/deny (boolean)
router
  .route('/attendees/:id')
    .patch(controller.confirmAttendee) // allows user (host) to accept or reject a potential attendee of a single post

module.exports = router;