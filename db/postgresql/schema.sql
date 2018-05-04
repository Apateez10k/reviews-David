CREATE TABLE stores (
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  price_level SMALLINT,
  neighborhood VARCHAR(50),
  city VARCHAR(50),
  street VARCHAR(50),
  rating REAL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  stores_id integer,
  author_name VARCHAR(50),
  profile_photo_url VARCHAR(100),
  rating SMALLINT,
  relative_time_description VARCHAR(20),
  text TEXT
);

CREATE TABLE stores_denormal (
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  price_level SMALLINT,
  neighborhood VARCHAR(50),
  reviews JSON,
  city VARCHAR(50),
  street VARCHAR(50),
  rating REAL
);


