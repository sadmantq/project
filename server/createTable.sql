CREATE TABLE director_movie (
    movie_id INTEGER PRIMARY KEY,
    director_id INTEGER,
    director_name VARCHAR(100)
);


CREATE TABLE producer_movie (
    movie_id INTEGER PRIMARY KEY,
    producer_id INTEGER,
    producer_name VARCHAR(100)
);


CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year DATE,
    image VARCHAR(200),
    is_adult VARCHAR(10),
    genre VARCHAR(100),
    description VARCHAR(500)
);


CREATE TABLE login_credentials (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100),
    type VARCHAR(100)
);

CREATE TABLE genre (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(100) NOT NULL
);

CREATE TABLE genre_movie (
    movie_id INTEGER,
    genre_id INTEGER
);

CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE director_info (
    director_id SERIAL PRIMARY KEY,
    director_name VARCHAR(100),
    date_of_birth DATE,
    nationality VARCHAR(50)
);

CREATE TABLE producer_info (
    producer_id SERIAL PRIMARY KEY,
    producer_name VARCHAR(100),
    nationality VARCHAR(50),
    date_of_birth DATE
);

CREATE TABLE likes (
    user_id INTEGER,
    movie_id INTEGER
);


CREATE TABLE dislikes (
    user_id INTEGER,
    movie_id INTEGER
);


CREATE TABLE watch_history (
    user_id INTEGER,
    movie_id INTEGER
);

CREATE TABLE watchlist (
    user_id INTEGER,
    movie_id INTEGER
);

CREATE TABLE favourites (
    movie_id INTEGER,
    user_id INTEGER
);


CREATE TABLE premium_plan (
    plan_name VARCHAR(100) PRIMARY KEY,
    plan_price INTEGER,
    validity INTEGER
);

CREATE TABLE user_plan (
    user_id INTEGER PRIMARY KEY,
    plan_name VARCHAR(100),
    plan_purchase_date DATE
);

CREATE TABLE rating (
    user_id INTEGER,
    movie_id INTEGER,
    rated INTEGER CHECK (rated >= 0 AND rated <= 10), 
    rating_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE review (
    user_id INTEGER,
    movie_id INTEGER,
    review VARCHAR(500),
    review_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


