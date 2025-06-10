

    CREATE OR REPLACE FUNCTION sp_get_all_books()
RETURNS SETOF books AS $$
BEGIN
    RETURN QUERY SELECT * FROM books ORDER BY title;
END;
$$ LANGUAGE plpgsql;


    CREATE OR REPLACE FUNCTION sp_get_book_by_id(p_id INTEGER)
RETURNS SETOF books AS $$
BEGIN
    RETURN QUERY SELECT * FROM books WHERE id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Book with ID % not found', p_id;
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION sp_get_books_by_published_year(p_published_year INTEGER)
RETURNS SETOF books AS $$
BEGIN
    RETURN QUERY SELECT * FROM books WHERE published_year = p_published_year;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No books found for published year %', p_published_year;
    END IF;
END;
$$ LANGUAGE plpgsql;

