-- DO $$ 
-- DECLARE
--     v_author_id INT;
-- BEGIN
--     -- Check if the author already exists
--     SELECT author_id INTO v_author_id
--     FROM authors
--     WHERE author_name = 'John Doe';

--     -- If author doesn't exist, add a new author
--     IF v_author_id IS NULL THEN
--         INSERT INTO authors (author_name) VALUES ('John Doe')
--         RETURNING author_id INTO v_author_id;
--     END IF;

--     -- Add the book with the obtained or newly created author_id
--     INSERT INTO books (book_title, book_quantity, book_genre, book_rating, book_price, author_id)
--     VALUES ('nigga', 10, 'nigga', 4.5, 19.99, v_author_id);
-- END;
-- $$  LANGUAGE PLPGSQL;

DO $$
DECLARE 
	dummy_variable INT;
BEGIN
	select id into dummy_variable
	from login_credentials
	where username = 'zhn';
	
	raise notice 'the id of zhn is %',dummy_variable;
END;
$$ LANGUAGE PLPGSQL;



