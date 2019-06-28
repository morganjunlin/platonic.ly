const router = require('express').Router()
const controller = require('./controller.js')

//USERS: create account/login/edit account
router
  .route('/user')
    .get(controller.loginUser) // allows user to log in with id/email and salted pw
    .post(controller.createUser) // allows user to create an account
    .put(controller.editUser) // allows user to edit account info
router
  .route('/user/:id')
    .get(controller.viewOneUser)
//POSTS: create post GET/edit post PATCH/see all posts GET/ see one post GET
router
  .route('/post')
    .get(controller.getAllPosts) // allows user to get all posts with search filters
    .post(controller.makeNewPost) // allows user to create a new post
// gets all posts as one user
router
  .route('/myposts/:id')
    .get(controller.getMyPosts)

// gets a single post as a host
router
  .route('/hostpost/:id')
    .get(controller.getOneHostPost)
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

router
  .route('/reviews')
    .get(controller.viewUserReviews)  // allows user to view all reviews of a particular user
    .post(controller.writeReview) // allows user to write a review about another user
module.exports = router;