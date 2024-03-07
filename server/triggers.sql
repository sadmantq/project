--TRIGGER :1 ; FUNCTION:1 
--sign up korar shomoy amader user er info ta login_Credentials er moddheo dhuke jabe

CREATE OR REPLACE FUNCTION insert_login_credentials()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO login_credentials (username, password, type)
    VALUES (NEW.username, NEW.password, NEW.type);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_login_credentials_trigger
AFTER INSERT ON user_info
FOR EACH ROW
EXECUTE FUNCTION insert_login_credentials();

--function :2 ==> movie rating ber kore jeta amra show korbo and parameter hishebe amra movie_id ta pass korbo

CREATE OR REPLACE FUNCTION calculate_average_rating(movie_id_param INTEGER)
RETURNS NUMERIC AS $$
DECLARE
    avg_rating NUMERIC;
BEGIN
    SELECT AVG(rated) INTO avg_rating
    FROM rating
    WHERE movie_id = movie_id_param;

    IF avg_rating IS NULL THEN
        avg_rating := NULL;
    END IF;

    RETURN avg_rating;
END;
$$ LANGUAGE plpgsql;



--TRIGGER:2 
--CHECKS IF ONE MOVIE ONE USER PAIR HAS A REVIEW OR NOT

CREATE OR REPLACE FUNCTION check_duplicate_review()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if a review already exists for the combination of movie_id and user_id
    IF EXISTS (
        SELECT 1
        FROM review
        WHERE movie_id = NEW.movie_id AND user_id = NEW.user_id
    ) THEN
        RAISE EXCEPTION 'User has already reviewed this movie.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_duplicate_review_trigger
BEFORE INSERT ON review
FOR EACH ROW
EXECUTE FUNCTION check_duplicate_review();


--TRIGGER:3 
--this trigger checks whether the rating we are putting is outside the scope or not

CREATE OR REPLACE FUNCTION check_rating_value()
RETURNS TRIGGER AS $$
BEGIN
	IF NEW.rated < 0 OR NEW.rated >10 THEN 
		RAISE EXCEPTION 'rating cannot be negative or greater than 10';
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;


--check the number of users have taken movie no x as their favourite

CREATE TRIGGER check_rating_value_trigger
BEFORE INSERT ON rating
FOR EACH ROW
EXECUTE FUNCTION check_rating_value();

CREATE OR REPLACE FUNCTION get_favorite_users_count(movie_id_input integer)
RETURNS integer AS
$$
DECLARE
    favorite_users_count integer;
BEGIN
    SELECT COUNT(DISTINCT user_id) INTO favorite_users_count
    FROM watchlist
    WHERE movie_id = movie_id_input;

    RETURN favorite_users_count;
END;
$$
LANGUAGE plpgsql;

--trigger to make sure the same favourites dont get added twice

CREATE OR REPLACE FUNCTION prevent_duplicate_favorites()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM favourites
        WHERE movie_id = NEW.movie_id
        AND user_id = NEW.user_id
    ) THEN
        RAISE EXCEPTION 'This movie_id and user_id combination already exists in favourites table';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_duplicate_favorites
BEFORE INSERT ON favourites
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_favorites();

--none of the review stuff can be null

CREATE OR REPLACE FUNCTION check_review_not_null() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.movie_id IS NULL THEN
        RAISE EXCEPTION 'movie_id cannot be null';
    END IF;

    IF NEW.user_id IS NULL THEN
        RAISE EXCEPTION 'user_id cannot be null';
    END IF;

    IF NEW.review_statement IS NULL THEN
        RAISE EXCEPTION 'review_statement cannot be null';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_review_not_null
BEFORE INSERT ON review
FOR EACH ROW
EXECUTE FUNCTION check_review_not_null();


--make sure kore je same movie same user duibar like na kore dey

CREATE OR REPLACE FUNCTION check_likes_duplicate()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM likes
        WHERE user_id = NEW.user_id AND movie_id = NEW.movie_id
    ) THEN
         RAISE EXCEPTION 'Duplicate user_id and movie_id pair';
    END IF; 
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_check_likes_duplicate
BEFORE INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION check_likes_duplicate();



--makes sure the genre table is unique


CREATE OR REPLACE FUNCTION check_genre_uniqueness() RETURNS TRIGGER AS $$
BEGIN
    
    IF EXISTS (SELECT 1 FROM genre WHERE name = NEW.name AND id <> NEW.id) THEN
        RAISE EXCEPTION 'Duplicate genre name: %', NEW.name;
    END IF;

    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_genre_uniqueness
BEFORE INSERT OR UPDATE ON genre
FOR EACH ROW EXECUTE FUNCTION check_genre_uniqueness();


--movies a add korle auto genre tables e add hoye jay

CREATE OR REPLACE FUNCTION insert_genre_on_movie_insert()
RETURNS TRIGGER AS $$
DECLARE
genre_id INTEGER;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM genre WHERE name = NEW.genre) THEN
        
        INSERT INTO genre (name) VALUES (NEW.genre) ;
    END IF;

    CALL get_genre_id(NEW.genre, genre_id);

    INSERT INTO genre_movie(movie_id, genre_id) VALUES (NEW.id, genre_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER add_genre_on_movie_insert
AFTER INSERT ON movies
FOR EACH ROW
EXECUTE FUNCTION insert_genre_on_movie_insert();



