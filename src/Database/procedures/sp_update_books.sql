CREATE OR REPLACE FUNCTION sp_update_books(
    p_id INTEGER,
    p_title VARCHAR(255),
    p_author VARCHAR(255),
    p_published_year INTEGER,
    p_isbn BIGINT,
    p_is_available BOOLEAN
)
RETURNS TABLE (
    id INTEGER,
    title VARCHAR(255),
    author VARCHAR(255),
    published_year INTEGER,
    isbn BIGINT,
    is_available BOOLEAN
)
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM books WHERE id = p_id) THEN
        RAISE EXCEPTION 'Book with ID % not found', p_id;
    END IF;

    RETURN QUERY
    UPDATE books
    SET
        title = COALESCE(p_title, title),
        author = COALESCE(p_author, author),
        published_year = COALESCE(p_published_year, published_year),
        isbn = COALESCE(p_isbn, isbn),
        is_available = COALESCE(p_is_available, is_available)
    WHERE id = p_id
    RETURNING id, title, author, published_year, isbn, is_available;
END;
$$ LANGUAGE plpgsql;
