const router = require('express').Router()
const controller = require('./controller.js')

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post)

router
  .route('/post/:id')
  .delete(controller.deleteOne)
  .get(controller.getOne)
  .patch(controller.patch)

module.exports = router;