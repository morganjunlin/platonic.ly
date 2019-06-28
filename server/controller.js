const db = require('../db/index.js');

module.exports = {
  /*
  ========================================================
  USER ROUTE BEGINS HERE
  ========================================================
  */
  loginUser: (req, res) => { // logging into an account
    const { email, password } = req.query;
    const passphrase = password; // ready for salting. apply hashing function to password.
    // a user inputs email and password to log in to their account. If the credentials are correct, it will send back a success message. If incorrect credentials, it will send a defense message.
    // this is a general function for user login. Currently our team is trying to figure out how to auth and save cookies and sessions, so that's why the queries send back sucess or defense messages rather than sending session info.
    db.query(`SELECT id FROM users WHERE email = '${email}' AND passphrase = '${passphrase}'`)
      .then(data => data.rows.length ? res.status(200).send(data.rows[0]) : res.status(200).send(`no its not in there`) )
      .catch(e => res.status(404).send(e.stack))
  },
  createUser: (req, res) => { // signing up for an account
    const { email, password, gender, age, profilePic, description } = req.body;
    const passphrase = password; // ready for salting. apply hashing function to password.
    const firstName = req.body.firstName[0].toUpperCase() + req.body.firstName.slice(1).toLowerCase();
    const lastName = req.body.lastName[0].toUpperCase() + req.body.lastName.slice(1).toLowerCase();
    //grabs all fields required to sign up for an account. Proper capitalization for first name and last name. Inserts into users table.
    //current database does not take into count of unique emails.
    //to create a user, these values are required: email, password, gender, age, first_name, last_name. All strings except age.
    console.log((`INSERT INTO users(email, passphrase, first_name, last_name, gender, age, profile_img, description) VALUES('${email}', '${passphrase}', '${firstName}', '${lastName}', '${gender}', ${age}, '${profilePic}', '${description}') RETURNING *;`))
    db.query(`INSERT INTO users(email, passphrase, first_name, last_name, gender, age, profile_img, description) VALUES('${email}', '${passphrase}', '${firstName}', '${lastName}', '${gender}', ${age}, '${profilePic}', '${description}') RETURNING *;`)
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
  viewOneUser: (req, res) => { // looking at one user's full profile
    const { id } = req.params; // id of user you want to view
    db.query(`
      SELECT
        id,
        CONCAT(first_name,' ',last_name) AS name,
        gender,
        age,
        profile_img AS "profilePic",
        description,
        avg_rating AS "rating"
      FROM
        users 
      WHERE
        id = ${id};
    `)
      .then(data => res.status(200).send(data.rows[0]))
      .catch(e => res.status(404).send(e))
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
    console.log('getting all posts')
    const {} = req.params;     //search filter not implemented yet
    // grabbing all posts and BARE MINIMUM info per post for main feed.
    db.query(
      `SELECT
        posts.id, 
        posts.title, 
        posts.post_city AS "locationCity", 
        posts.post_zip AS "locationZip", 
        json_build_object(
          'id',posts.category_id,'name',
          categories.cat_name,
          'bg',categories.cat_image
          ) AS category,
        array_length(ARRAY(select id
          FROM attendees WHERE attendees.posts_id = posts.id AND attendees.is_accepted = true
          ), 1) AS "currentAttendees", 
        posts.max_attendees as "maxAttendees", 
        posts.schedule, 
        posts.created_at 
      FROM 
        posts, 
        categories
      WHERE
        categories.id = posts.category_id
      ORDER BY 
        schedule asc
        
      ;`
        )
      .then((data) => res.status(200).send(data.rows))
      .catch(e => res.status(404).send(e.stack))
  },

  getOnePost: (req, res) => { // allows user to view one post
    const { id } = req.params; // pass in the id of the post you want to see
    //this queries into multiple tables at once and may not have optimal query time.
    //returns id, title, description, exact location, category, an array of accepted attendees that includes user id, first name, and profile pic, max attendees, when the event is scheuled, and when the event was created.
    db.query(
      `SELECT
        posts.id,
        posts.title,
        posts.post_desc AS description,
        json_build_object(
          'address',posts.post_address,
          'city', posts.post_city,
          'state',posts.post_state,
          'zip',posts.post_zip
          ) AS location,
        json_build_object(
          'id',posts.category_id,
          'name', categories.cat_name,
          'bg', categories.cat_image
          ) AS category,
        ARRAY(SELECT json_build_object(
          'userID',attendees.users_id,
          'firstName', (SELECT first_name FROM users WHERE id = attendees.users_id),
          'profilePic', (SELECT profile_img FROM users WHERE id = attendees.users_id),
          'accepted', attendees.is_accepted)
          FROM attendees WHERE attendees.posts_id = posts.id AND attendees.is_accepted = true) AS "currentAttendees",
        posts.max_attendees as "maxAttendees", 
        posts.schedule, 
        posts.created_at
      FROM
        posts, 
        categories 
      WHERE 
        posts.id = ${id} AND categories.id = posts.category_id;`)
      .then((data) => res.status(200).send(data.rows[0]))
      .catch(e => res.status(404).send(e.stack))
  },

  makeNewPost: (req, res) => { // allows user to create a new post
    const { userID, title, address, zip, description, category, maxAttendees, schedule } = req.body;
    console.log(`INSERT INTO posts(title, post_address, post_city, post_state, post_zip, post_desc, category_id, max_attendees, schedule)
    VALUES('${title}', '${address}', 'Los Angeles', 'CA', ${zip}, '${description}', ${category}, ${maxAttendees}, '${schedule}')
    RETURNING id as "postID";`)    


    //above are values needed to create a new post.
    //below, a new post row is created and the post id is returned
    //with the returned post id, a new row is created on users_posts, the table that keeps track of posts that a user created.
    db.query(`
      INSERT INTO posts(title, post_address, post_city, post_state, post_zip, post_desc, category_id, max_attendees, schedule)
      VALUES('${title}', '${address}', 'Los Angeles', 'CA', ${zip}, '${description}', ${category}, ${maxAttendees}, '${schedule}')
      RETURNING id as "postID";
      `)
      .then(data => {
        const {postID} = data.rows[0];
        db.query(`
        INSERT INTO users_posts(users_id, posts_id) VALUES(${userID}, ${postID});
        INSERT INTO attendees (posts_id, users_id, is_accepted) VALUES (${postID}, ${userID}, true);
        `)
          .then(data =>  res.status(200).send(`created post #${postID} by user #${userID} titled ${title} scheduled for ${schedule}`))
          .catch(e => res.status(404).send(e.stack))
      })
      .catch(e => res.status(404).send(e.stack))
  },

  editOnePost: async (req, res) => { // allows user to edit their post
    const { id } = req.params; // post ID
    let updates = '';
    // body json's key names must be in format of posts schema.
    for (key in req.body) {
      if (typeof req.body[key] === 'number') {
        updates += await `${key} = ${req.body[key]}, `
      } else {
        updates += await `${key} = '${req.body[key]}', `
      }
    }
    updates = updates.slice(0, updates.length - 2);
    db.query(`UPDATE posts SET ${updates} WHERE id = ${id};`)
      .then(() => res.status(200).send(`Updated post: ${id}`))
      .catch(e => res.status(404).send(e.stack))
  },

  deleteOnePost: (req, res) => { // allows user to delete their post
    const { id } = req.params; // post id
    // deletes attendees and post
    db.query(`
      DELETE FROM attendees WHERE posts_id = ${id};
      DELETE FROM users_posts WHERE posts_id = ${id};
      DELETE FROM posts WHERE id = ${id};
    `)
      .then(data => res.status(200).send(`Deleted post # ${id}`))
      .catch(e => res.status(404).send(e.stack))
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
    //need post id, then return all attendees of that post whether accepted or not
    const { postID } = req.body;
    // returns id in attendees table, id of event, user info, and whether accepted or not.
    db.query(`
      SELECT  
        id AS "attendeesID",
        posts_id AS "eventID",
        json_build_object(
          'id',users_id,
          'firstName', (SELECT first_name FROM users WHERE id = attendees.users_id),
          'profilePic', (SELECT profile_img FROM users WHERE id = attendees.users_id)
          ) AS user,
        is_accepted AS accepted
      FROM
        attendees 
      WHERE
        posts_id = ${postID};
    `)
      .then((data) => res.status(200).send(data.rows))
      .catch(e => res.status(404).send(e.stack))
  },

  requestToBeAttendee: (req, res) => { // allows user to request to join a single post
    const { postID, userID } = req.body;
    //requires id of post and id of user. default to false for is_attending.
    db.query(`INSERT INTO attendees (posts_id, users_id) VALUES (${postID}, ${userID}) RETURNING *;`)
      .then(data =>  res.status(200).send(data.rows[0]))
      .catch(e => res.status(404).send(e.stack))
  },

  confirmAttendee: (req, res) => { // allows user (host) to accept a potential attendee of a single post
    const { id } = req.params;
    db.query(`UPDATE attendees SET is_accepted = true WHERE id = ${id};`)
      .then(data =>  res.status(200).send(`Attendee # ${id} has been accepted to join your event`))
      .catch(e => res.status(404).send(e.stack))
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
    const { userID } = req.body; // id primary key of user
    // output is an array of reviews represented by objects. each review has a review id, review rating, review text, review author id, author's profile pic, and author's first name.
    db.query(`
      SELECT
        reviews.id,
        reviews.rating,
        reviews.review,
        json_build_object(
          'id',reviews.author,
          'firstName',users.first_name,
          'profilePic',users.profile_img
          ) AS author,
        reviews.created_at AS "createdAt"
      FROM
        reviews,
        users
      WHERE
        reviews.id IN (SELECT reviews_id FROM users_reviews WHERE users_id = ${userID}) AND users.id = reviews.author;
      `)
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