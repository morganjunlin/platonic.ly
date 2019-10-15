let faker = require('faker')
let db = require('../db/index')

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

//data pool 
let gender = ['male', 'female'];
let categories = {
  'Food': { value: 1, bg: 'https://st.focusedcollection.com/3839757/i/650/focused_178420246-stock-photo-asian-friends-having-dinner-together.jpg' },
  'Sports': { value: 2, bg: 'https://c8.alamy.com/comp/P9K822/young-asian-adult-players-playing-basketball-on-outdoor-court-P9K822.jpg' },
  'Nature': { value: 3, bg: 'https://image.shutterstock.com/image-photo/beautiful-autumn-forest-mountain-path-260nw-111970076.jpg' },
  'Education': { value: 4, bg: 'https://cdn.explara.com/thailand20180713154259.jpg' },
  'Studying': { value: 5, bg: 'https://as1.ftcdn.net/jpg/01/87/90/48/500_F_187904831_iGE4JXj48vKUsLVP5MVo81x9SIAyyQfW.jpg' },
  'Picnic': { value: 6, bg: 'https://as2.ftcdn.net/jpg/02/12/98/15/500_F_212981555_5OK5TnV7AKOx1NCTpld4pXDJ2L5CUvjQ.jpg' },
  'Beach': { value: 7, bg: 'https://as1.ftcdn.net/jpg/02/29/50/74/500_F_229507428_bDMkZ13pBOA3hjQfNTEuDgjQVBgKoqKF.jpg' },
  'Drinks': { value: 8, bg: 'https://t3.ftcdn.net/jpg/01/11/55/60/500_F_111556056_E1B9cLEy7JX2rMyv48TKfgKEU6DukFxo.jpg' },
  'Barbeque': { value: 9, bg: 'https://en.pimg.jp/029/849/737/1/29849737.jpg' },
  'Camping': { value: 10, bg: 'https://en.pimg.jp/032/573/255/1/32573255.jpg' }
};
let categoriesPool = [
        { value: 'Food' },
        { value: 'Sports' },
        { value: 'Nature' },
        { value: 'Education' },
        { value: 'Studying' },
        { value: 'Picnic' },
        { value: 'Beach' },
        { value: 'Drinks' },
        { value: 'Barbeque' },
        { value: 'Camping' } ];
let images = [faker.image.fashion(), faker.image.food(), faker.image.nightlife(), faker.image.nature(), faker.image.sports(), faker.image.city(), faker.image.business()];
let images2 = [faker.image.fashion(), faker.image.food(), faker.image.nightlife(), faker.image.nature(), faker.image.sports(), faker.image.city(), faker.image.business()];
let images3 = [faker.image.fashion(), faker.image.food(), faker.image.nightlife(), faker.image.nature(), faker.image.sports(), faker.image.city(), faker.image.business()];

for (let i = 0; i < 9; i++) {
  //generate Users
  let newUser = {
    id: i + 100,
    email: faker.internet.email(),
    passphrase: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: gender[getRandomInt(0, 1)],
    age: getRandomInt(13, 40),
    profile_img: faker.image.fashion(),
    description: faker.lorem.sentences(),
    avg_rating: getRandomInt(0, 5)
  }; 

  //generate categories
  let newCategories = {
    id: i+1,
    cat_name: categoriesPool[i].value,
    cat_image: categories[categoriesPool[i].value].bg
  }; 

  //generate posts
  let newPost = {
    id: i+100,
    title: faker.lorem.words(),
    post_address: faker.address.streetAddress(),
    post_city: faker.address.city(),
    post_state: faker.address.state(),
    post_zip: 90036, //faker.address.zipCode(),
    post_desc: faker.lorem.sentences(),
    category_id: newCategories.id,
    max_attendees: getRandomInt(2, 6),
    schedule: new Date('June 24, 2019 21:15')
  };

  //generate attendees (new)
  let newAttendees = {
    id: i + 100,
    posts_id: newPost.id,
    users_id: newUser.id
  };

  //generate users_posts
  let newUsers_posts = {
    users_id: newUser.id,
    posts_id: newPost.id,
  };
  
  //generate reviews
  let newReviews = {
    id: i + 100,
    author: newUser.id,
    rating: getRandomInt(1, 5),
    review: faker.lorem.sentences(1)
  };

  //generate users_reviews
  let newUsers_reviews = {
    users_id: newUser.id,
    reviews_id: newReviews.id
  };
  
  db.query('INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [newUser.id, newUser.email, newUser.passphrase, newUser.first_name, newUser.last_name, newUser.gender, newUser.age, newUser.profile_img, newUser.description, newUser.avg_rating])
    .then(() => db.query('INSERT INTO categories VALUES($1, $2, $3)', [newCategories.id, newCategories.cat_name, newCategories.cat_image])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO posts VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [newPost.id, newPost.title, newPost.post_address, newPost.post_city, newPost.post_state, newPost.post_zip, newPost.post_desc, newPost.category_id, newPost.max_attendees, newPost.schedule])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO attendees VALUES($1, $2, $3)', [newAttendees.id, newAttendees.posts_id, newAttendees.users_id])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO users_posts VALUES($1, $2)', [newUsers_posts.users_id, newUsers_posts.posts_id])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO reviews VALUES($1, $2, $3, $4)', [newReviews.id, newReviews.author, newReviews.rating, newReviews.review])
                  .catch (err => console.log(err)))
    .then(() => db.query('INSERT INTO users_reviews VALUES($1, $2)', [newUsers_reviews.users_id, newUsers_reviews.reviews_id])
                  .catch (err => console.log(err)))
    .catch (err => console.log(err));
}

console.log(`... let's give about 15 seconds to finish seeding.`);