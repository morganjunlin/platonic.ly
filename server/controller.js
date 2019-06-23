const db = require('../db/index.js');

module.exports = {

  getUser: (req, res) => {
    console.log('ar you tryna login')
  },
  createUser: (req, res) => {
    const { email, passphrase, gender, age } = req.body;
    const first_name = req.body.first_name[0].toUpperCase() + req.body.first_name.slice(1).toLowerCase();
    const last_name = req.body.last_name[0].toUpperCase() + req.body.last_name.slice(1).toLowerCase();
    //grabs all fields required to sign up for an account. Proper capitalization for first name and last name. Inserts into users table.
    //current database does not take into count of unique emails.
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

  },

  post: (req, res) => {

  },

  patch: (req, res) => {

  },

  deleteOne: (req, res) => {

  }

}