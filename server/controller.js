const db = require('../db/index.js');

module.exports = {

  getUser: (req, res) => {
    console.log('ar you tryna login')
    const { email, password } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    db.query(``)
  },
  createUser: (req, res) => {
    const { email, password, gender, age } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    const first_name = req.body.first_name[0].toUpperCase() + req.body.first_name.slice(1).toLowerCase();
    const last_name = req.body.last_name[0].toUpperCase() + req.body.last_name.slice(1).toLowerCase();
    //grabs all fields required to sign up for an account. Proper capitalization for first name and last name. Inserts into users table.
    //current database does not take into count of unique emails.
    //to create a user, these values are required: email, password, gender, age, first_name, last_name. All strings except age.
    db.query(`INSERT INTO users(email, passphrase, first_name, last_name, gender, age) VALUES('${email}', '${passphrase}', '${first_name}', '${last_name}', '${gender}', ${age}) RETURNING *;`)
      .then(data =>  res.status(200).send(data.rows[0]))
      .catch(e => res.status(404).send(e.stack))
  },
  editUser: (req, res) => {
    console.log('are u trying to lie about urself')
  },
  getOne: (req, res) => {
  },
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