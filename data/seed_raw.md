INSERT INTO users(email, passphrase, first_name, last_name, gender, age, profile_img, description) 
VALUES('fakeemail@gmail.com', 'password', 'John', 'Smith', 'male', 25, 'https://image.flaticon.com/icons/svg/163/163801.svg', 'I love veggies')
RETURNING *;

INSERT INTO users(email, passphrase, first_name, last_name, gender, age, profile_img, description) 
VALUES('karen@gmail.com', 'password', 'Karen', 'Barton', 'female', 27, 'https://image.flaticon.com/icons/svg/163/163847.svg', 'I hate veggies')
RETURNING *;

INSERT INTO users(email, passphrase, first_name, last_name, gender, age, profile_img, description) 
VALUES('li@gmail.com', 'password', 'Victor', 'Sun', 'male', 30, 'https://image.flaticon.com/icons/svg/169/169895.svg', 'I like movies')
RETURNING *;

INSERT INTO users(email, passphrase, first_name, last_name, gender, age, profile_img, description) 
VALUES('morgan@gmail.com', 'password', 'Morgan', 'Anderson', 'female', 21, 'https://image.flaticon.com/icons/svg/145/145852.svg', 'I like beer')
RETURNING *;



INSERT INTO categories(cat_name, cat_image)
VALUES('food','https://st.focusedcollection.com/3839757/i/650/focused_178420246-stock-photo-asian-friends-having-dinner-together.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('sports','https://c8.alamy.com/comp/P9K822/young-asian-adult-players-playing-basketball-on-outdoor-court-P9K822.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('nature','https://ak7.picdn.net/shutterstock/videos/5851637/thumb/6.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('education','https://cdn.explara.com/thailand20180713154259.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('studying','https://as1.ftcdn.net/jpg/01/87/90/48/500_F_187904831_iGE4JXj48vKUsLVP5MVo81x9SIAyyQfW.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('picnic','https://as2.ftcdn.net/jpg/02/12/98/15/500_F_212981555_5OK5TnV7AKOx1NCTpld4pXDJ2L5CUvjQ.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('beach','https://as1.ftcdn.net/jpg/02/29/50/74/500_F_229507428_bDMkZ13pBOA3hjQfNTEuDgjQVBgKoqKF.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('drinks','https://t3.ftcdn.net/jpg/01/11/55/60/500_F_111556056_E1B9cLEy7JX2rMyv48TKfgKEU6DukFxo.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('barbeque','https://en.pimg.jp/029/849/737/1/29849737.jpg');

INSERT INTO categories(cat_name, cat_image)
VALUES('camping','https://en.pimg.jp/032/573/255/1/32573255.jpg');

INSERT INTO posts(title, post_address, post_city, post_state, post_zip, post_desc, category_id, max_attendees, schedule)
VALUES('lets get pizza', 'pizza shop', 'Los Angeles', 'California', 90036, 'who likes pizza lets get pizza', 1, 5, 'June 29, 2019 21:15');

INSERT INTO users_posts(users_id, posts_id) VALUES(2, 1);
INSERT INTO attendees (posts_id, users_id, is_accepted) VALUES (1, 2, true);

INSERT INTO posts(title, post_address, post_city, post_state, post_zip, post_desc, category_id, max_attendees, schedule)
VALUES('basketball anyone?', 'park', 'Los Angeles', 'California', 90036, 'Hi! Looking for some people to shoot hoops with. Im not really that great haha', 2, 3, 'June 29, 2019 17:15');

INSERT INTO users_posts(users_id, posts_id) VALUES(2, 2);
INSERT INTO attendees (posts_id, users_id, is_accepted) VALUES (2, 2, true);
INSERT INTO attendees (posts_id, users_id) VALUES (2, 4);

INSERT INTO posts(title, post_address, post_city, post_state, post_zip, post_desc, category_id, max_attendees, schedule)
VALUES('Hiking @ Runyon with dogs!', 'Hollywood', 'Los Angeles', 'California', 90036, 'Early morning hike anyone?', 3, 10, 'June 29, 2019 6:15');

INSERT INTO users_posts(users_id, posts_id) VALUES(4, 3);
INSERT INTO attendees (posts_id, users_id, is_accepted) VALUES (3, 4, true);
INSERT INTO attendees (posts_id, users_id, is_accepted) VALUES (3, 2, true);
INSERT INTO attendees (posts_id, users_id) VALUES (3, 5);
INSERT INTO attendees (posts_id, users_id) VALUES (3, 6);

INSERT INTO reviews(author, rating, review) VALUES(2, 5, 'she so nice');
INSERT INTO users_reviews(users_id, reviews_id) VALUES(4, 1);