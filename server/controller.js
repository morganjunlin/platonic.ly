const db = require('../db/index.js');

module.exports = {
  /*
  ========================================================
  USER ROUTE BEGINS HERE
  ========================================================
  */
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
    const { email, password, gender, age, description } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    const first_name = req.body.first_name[0].toUpperCase() + req.body.first_name.slice(1).toLowerCase();
    const last_name = req.body.last_name[0].toUpperCase() + req.body.last_name.slice(1).toLowerCase();
    //grabs all fields required to sign up for an account. Proper capitalization for first name and last name. Inserts into users table.
    //current database does not take into count of unique emails.
    //to create a user, these values are required: email, password, gender, age, first_name, last_name. All strings except age.
    db.query(`INSERT INTO users(email, passphrase, first_name, last_name, gender, age, description) VALUES('${email}', '${passphrase}', '${first_name}', '${last_name}', '${gender}', ${age}, '${description}') RETURNING *;`)
      .then(data =>  res.status(200).send(data.rows[0]))
      .catch(e => res.status(404).send(e.stack))
  },
  editUser: (req, res) => { // editing info of an account based on their email.
    const { email, password, gender, age, description } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    const first_name = req.body.first_name[0].toUpperCase() + req.body.first_name.slice(1).toLowerCase();
    const last_name = req.body.last_name[0].toUpperCase() + req.body.last_name.slice(1).toLowerCase();
    //grabs all fields of users row and edits all of them, even if there aren't edits made.
    // For example, a user might want to edit only their gender. This function edits every column of that user's row (found by email).
    // an edit request will require email, password, gender, age, first_name, last_name fields.
    // this function can be updated in the future based on our application's needs.
    db.query(`UPDATE users SET passphrase = '${passphrase}', first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', age = ${age}, description = ${description} WHERE email = '${email}'`)
      .then(data =>  res.status(200).send(`Updated info for ${email}!`))
      .catch(e => res.status(404).send(e.stack))
  },
  /*
  ========================================================
  USER ROUTE ENDS HERE
  ========================================================
  */
  /*
  ========================================================
  POST ROUTE BEGINS HERE
  ========================================================
  */
  getAllPosts: (req, res) => { // allows user to get all posts with search filters
    db.query('SELECT * FROM posts')
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(404).send("error get: ", err))
  },
  getOnePost: (req, res) => { // allows user to view one post
    const { id } = req.params;
    db.query(`SELECT * FROM posts WHERE id = ${id}`)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(404).send("error get: ", err))
  },

  makeNewPost: (req, res) => { // allows user to create a new post

  },

  editOnePost: (req, res) => { // allows user to edit their post

  },

  deleteOnePost: (req, res) => { // allows user to delete their post

  },
  /*
  ========================================================
  POST ROUTE ENDS HERE
  ========================================================
  */
  /*
  ========================================================
  ATTENDEE ROUTE BEGINS HERE
  ========================================================
  */
  getAllAttendees: (req, res) => { // allows user to view attendees of a single post
    db.query('SELECT * FROM attendees')
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(404).send("error get: ", err))
  },

  requestToBeAttendee: (req, res) => { // allows user to request to join a single post

  },
  confirmAttendee: (req, res) => { // allows user (host) to accept or reject a potential attendee of a single post

  },
  /*
  ========================================================
  ATTENDEE ROUTE ENDS HERE
  ========================================================
  */
   /*
  ========================================================
  RATING ROUTE BEGINS HERE
  ========================================================
  */
  viewUserReviews: (req, res) => { // allows user to view all reviews of a particular user
    const { users_id } = req.body; // id primary key of user
    // output is an array of reviews represented by objects. each review has a review id, review rating, review text, review author id, author's profile pic, and author's first name.
    db.query(`SELECT reviews.id, reviews.rating, reviews.review, reviews.author, users.profile_img, users.first_name FROM reviews, users WHERE reviews.id IN (SELECT reviews_id FROM users_reviews WHERE users_id = ${users_id}) AND users.id = reviews.author;`)
      .then(data => res.status(200).send(data.rows))
      .catch(e => res.status(404).send(e.stack))
  },

  writeReview: (req, res) => { // allows user to write a review about another user
    const { author, rating, review } = req.body;
    const users_id = req.body.reviewingUser;
    // pass in values for author (author of review foreign key), rating (number 1-5), review (100 character string), reviewingUser (user being reviewed, foreign key).
    // this function creates a row in reviews table and then into users_reviews table.
    // reviews table represents all reviews posted by all users in the entire app.
    // users_reviews links each of those reviews with the user being reviewed.
    db.query(`INSERT INTO reviews(author, rating, review) VALUES(${author}, ${rating}, '${review}') RETURNING id;`)
      .then(data => {
        const reviews_id = data.rows[0].id; //foreign key id of review just posted
        db.query(`INSERT INTO users_reviews(users_id, reviews_id) VALUES(${users_id}, ${reviews_id});`)
          .then(data => res.status(200).send(`successfully posted review`))
          .catch(e => res.status(404).send(e.stack))
      })
      .catch(e => res.status(404).send(e.stack))
  }
  /*
  ========================================================
  RATING ROUTE ENDS HERE
  ========================================================
  */
}