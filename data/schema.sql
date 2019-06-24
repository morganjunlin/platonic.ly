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
  cat_name      TEXT
);

CREATE TABLE IF NOT EXISTS posts (
  id            SERIAL PRIMARY KEY,
  title         TEXT NOT NULL,
  post_address  TEXT,
  post_city     TEXT NOT NULL,
  post_state    TEXT NOT NULL,
  post_zip      TEXT,
  post_desc     TEXT,
  images        TEXT[],
  category_id   INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS attendees (
  id            SERIAL PRIMARY KEY,
  users_id      INTEGER REFERENCES users(id),
  is_accepted   BOOLEAN DEFAULT 'false'
);

CREATE TABLE IF NOT EXISTS posts_attendees (
  posts_id      INTEGER REFERENCES posts(id),
  attendees_id  INTEGER REFERENCES attendees(id)
);

CREATE TABLE IF NOT EXISTS users_posts (
  users_id      INTEGER REFERENCES users(id),
  posts_id      INTEGER REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id            SERIAL PRIMARY KEY,
  author        INTEGER REFERENCES users(id),
  rating        INTEGER,
  review        VARCHAR(140)
);

CREATE TABLE IF NOT EXISTS users_reviews (
  users_id      INTEGER REFERENCES users(id),
  reviews_id    INTEGER REFERENCES reviews(id)
);
