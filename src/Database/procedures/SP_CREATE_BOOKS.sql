CREATE OR REPLACE FUNCTION SP_CREATE_BOOKS(
    p_title VARCHAR,
    p_author VARCHAR,
    p_published_year INTEGER,
    p_isbn BIGINT,
    p_is_available BOOLEAN
)
RETURNS SETOF books AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO books(title, author, published_year, isbn, is_available)
    VALUES (p_title, p_author, p_published_year, p_isbn, p_is_available)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

