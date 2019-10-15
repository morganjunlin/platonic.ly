CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  passphrase    TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT,
  gender        TEXT,
  age           INTEGER,
  profile_img   TEXT,
  description   TEXT,
  avg_rating    INTEGER
);

CREATE TABLE IF NOT EXISTS categories (
  id            SERIAL PRIMARY KEY,
  cat_name      TEXT,
  cat_image     TEXT
);

CREATE TABLE IF NOT EXISTS posts (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(140) NOT NULL,
  post_address  TEXT,
  post_city     TEXT NOT NULL,
  post_state    TEXT NOT NULL,
  post_zip      INTEGER,
  post_desc     TEXT,
  category_id   INTEGER REFERENCES categories(id),
  max_attendees INTEGER,
  schedule      TIMESTAMP,
  created_at    TIMESTAMP default current_timestamp
);

CREATE TABLE IF NOT EXISTS attendees (
  id            SERIAL PRIMARY KEY,
  posts_id      INTEGER REFERENCES posts(id),
  users_id      INTEGER REFERENCES users(id),
  is_accepted   BOOLEAN DEFAULT 'false'
);

CREATE TABLE IF NOT EXISTS users_posts (
  users_id      INTEGER REFERENCES users(id),
  posts_id      INTEGER REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id            SERIAL PRIMARY KEY,
  author        INTEGER REFERENCES users(id),
  rating        INTEGER,
  review        VARCHAR(140),
  created_at    TIMESTAMP default current_timestamp
);

CREATE TABLE IF NOT EXISTS users_reviews (
  users_id      INTEGER REFERENCES users(id),
  reviews_id    INTEGER REFERENCES reviews(id)
);
