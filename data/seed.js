let faker = require('faker')
let db = require('../db/index')

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

//data pool 
let gender = ['male', 'female'];
let categoriesPool = ['sport', 'art', 'food', 'tours', 'book', 'education', 'workout', 'games', 'language'];
let images = [faker.image.fashion(), faker.image.food(), faker.image.nightlife(), faker.image.nature(), faker.image.sports(), faker.image.city(), faker.image.business()]
let images2 = [faker.image.fashion(), faker.image.food(), faker.image.nightlife(), faker.image.nature(), faker.image.sports(), faker.image.city(), faker.image.business()]
let images3 = [faker.image.fashion(), faker.image.food(), faker.image.nightlife(), faker.image.nature(), faker.image.sports(), faker.image.city(), faker.image.business()]

for (let i = 0; i < 2; i++) {
  //generate Users
  let newUser = {
    id: i,
    email: faker.internet.email(),
    passphrase: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: gender[getRandomInt(0, 1)],
    age: getRandomInt(13, 40),
    description: faker.lorem.sentences(),
    avg_rating: getRandomInt(0, 100)
  }; 

  //generate categories
  let newCategories = {
    id: i,
    cat_name: categoriesPool[getRandomInt(0, categoriesPool.length-1)]
  }; 

  //generate posts
  let newPost = {
    id: i,
    title: faker.lorem.words(),
    post_address: faker.address.streetAddress(),
    post_city: faker.address.city(),
    post_state: faker.address.state(),
    post_zip: faker.address.zipCode(),
    post_desc: faker.lorem.sentences(),
    images: [images[getRandomInt(0, images.length-1)], images[getRandomInt(0, images.length-1)], images[getRandomInt(0, images.length-1)], images[getRandomInt(0, images.length-1)], images[getRandomInt(0, images.length-1)]],
    category_id: newCategories.id
  };

  //generate attendees
  let newAttendees = {
    id: i,
    users_id: newUser.id
  };

  //generate posts_attendees
  let newPosts_attendees = {
    posts_id: newPost.id,
    attendees_id: newAttendees.id
  };
  
  //generate users_posts
  let newUsers_posts = {
    users_id: newUser.id,
    posts_id: newPost.id,
  };
  
  //generate reviews
  let newReviews = {
    id: i,
    rating: getRandomInt(80, 100),
    review: faker.lorem.sentences()
  };

  //generate users_reviews
  let newUsers_reviews = {
    users_id: newUser.id,
    reviews_id: newReviews.id
  };
  
  db.query('INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [newUser.id, newUser.email, newUser.passphrase, newUser.first_name, newUser.last_name, newUser.gender, newUser.age, newUser.description, newUser.avg_rating])
    .then(() => db.query('INSERT INTO categories VALUES($1, $2)', [newCategories.id, newCategories.cat_name])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO posts VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [newPost.id, newPost.title, newPost.post_address, newPost.post_city, newPost.post_state, newPost.post_zip, newPost.post_desc, newPost.images, newPost.category_id])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO attendees VALUES($1, $2)', [newAttendees.id, newAttendees.users_id])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO posts_attendees VALUES($1, $2)', [newPosts_attendees.posts_id, newPosts_attendees.attendees_id])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO users_posts VALUES($1, $2)', [newUsers_posts.users_id, newUsers_posts.posts_id])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO reviews VALUES($1, $2, $3)', [newReviews.id, newReviews.rating, newReviews.review])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO users_reviews VALUES($1, $2)', [newUsers_reviews.users_id, newUsers_reviews.reviews_id])
                  .catch (err => console.log(err)))
    .catch (err => console.log(err));
}

console.log(`... let's give about 10 seconds to finish seeding.`);