const db = require('../db/index.js')

module.exports = {
  getAll: (req, res) => {
    db.query('SELECT * FROM posts')
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(404).send("error get: ", err))
  },

  makePost: (req, res) => {

  },

  getOnePost: (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM posts WHERE id = ${id}`)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(404).send("error get: ", err))
  },

  deleteOnePost: (req, res) => {

  },

  patchPost: (req, res) => {

  },

  makeAttendeesPost: (req, res) => {

  },

  getAllAttendees: (req, res) => {
    db.query('SELECT * FROM attendees')
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(404).send("error get: ", err))
  },

  confirmAttendees: (req, res) => {

  }

}