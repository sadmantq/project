--get the id of a genre from name

CREATE OR REPLACE PROCEDURE get_genre_id(IN genre_name VARCHAR, OUT genre_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT id INTO genre_id FROM genre WHERE name = genre_name;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Genre with name % not found', genre_name;
    END IF;
END;
$$;


--procedure to check dislike count of a movie

CREATE OR REPLACE PROCEDURE check_dislikes_count(movie_id_to_check INTEGER, OUT dislikes_count INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    
    dislikes_count := 0;

    SELECT COUNT(*)
    INTO dislikes_count
    FROM dislikes
    WHERE movie_id = movie_id_to_check;

    
    RETURN;
END;
$$;


CREATE OR REPLACE FUNCTION get_dislikes_count(movie_id_to_check INTEGER) 
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    dislikes_count INTEGER;
BEGIN
   
    CALL check_dislikes_count(movie_id_to_check, dislikes_count);
    
    RETURN dislikes_count;
END;
$$;


