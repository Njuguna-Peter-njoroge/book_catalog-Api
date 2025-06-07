CREATE OR REPLACE FUNCTION SP_CREATE_BOOKS(
      p_TITLE VARCHAR(255) NOT NULL,
      p_AUTHOR VARCHAR(255) UNIQUE NOT NULL,
      p_PUBLISHED_YEAR INTEGER NOT NULL.
      p_isbn BIGINT UNIQUE NOT NULL,
      p_is_available BOOLEAN DEFAULT TRUE
)

RETURNS TABLE(
ID INTEGER,
TITLE VARCHAR(255),
AUTHOR VARCHAR(255),
PUBLISHED_YEAR INTEGER NOT NULL,
isbn BIGINT UNIQUE NOT NULL,
is_available BOOLEAN DEFAULT TRUE
)AS $$
BEGIN


-- check if a boo with the same title exists
if EXISTS (SELECT ! FROM BOOKS WHERE BOOKS.title = p_TITLE) THEN
RAISE EXCEPTION 'book with title % already exists', p_TITLE;
END if;


RETURN QUERY 
INSERT INTO BOOKS(title,author,published_year,isbn,is_available)
VALUES(p_TITLE,p_AUTHOR,p_PUBLISHED_YEAR,p_isbn, p_is_available)
  RETURNING title, author, published_year, isbn;
END;
$$ language plpgsql;
