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


