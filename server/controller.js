const db = require('../db/index.js');

module.exports = {

  getUser: (req, res) => { // logging into an account
    const { email, password } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    // a user inputs email and password to log in to their account. If the credentials are correct, it will send back a success message. If incorrect credentials, it will send a defense message.
    // this is a general function for user login. Currently our team is trying to figure out how to auth and save cookies and sessions, so that's why the queries send back sucess or defense messages rather than sending session info.
    db.query(`SELECT * FROM users WHERE email = '${email}' AND passphrase = '${passphrase}'`)
      .then(data => data.rows.length ? res.status(200).send(`correct credentials! data.rows[0] has your login info`) : res.status(200).send(`are you a hacker`) )
      .catch(e => res.status(404).send(e.stack))
  },
  createUser: (req, res) => { // signing up for an account
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
  editUser: (req, res) => { // editing info of an account based on their email.
    const { email, password, gender, age } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    const first_name = req.body.first_name[0].toUpperCase() + req.body.first_name.slice(1).toLowerCase();
    const last_name = req.body.last_name[0].toUpperCase() + req.body.last_name.slice(1).toLowerCase();
    //grabs all fields of users row and edits all of them, even if there aren't edits made.
    // For example, a user might want to edit only their gender. This function edits every column of that user's row (found by email).
    // an edit request will require email, password, gender, age, first_name, last_name fields.
    // this function can be updated in the future based on our application's needs.
    db.query(`UPDATE users SET passphrase = '${passphrase}', first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', age = ${age} WHERE email = '${email}'`)
      .then(data =>  res.status(200).send(`Updated info for ${email}!`))
      .catch(e => res.status(404).send(e.stack))
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