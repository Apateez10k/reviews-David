CREATE TABLE stores (
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  price_level SMALLINT,
  neighborhood VARCHAR(30),
  city VARCHAR(30),
  street VARCHAR(30),
  rating SMALLINT
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  stores_id integer,
  author_name VARCHAR(30),
  profile_photo_url VARCHAR(100),
  rating SMALLINT,
  relative_time_description VARCHAR(20),
  text TEXT
);

