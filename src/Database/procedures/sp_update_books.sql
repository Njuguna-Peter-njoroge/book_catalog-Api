CREATE OR REPLACE FUNCTION sp-update_books(
      P_id INTEGER,
       p_TITLE VARCHAR(255) NOT NULL,
      p_AUTHOR VARCHAR(255) UNIQUE NOT NULL,
      p_PUBLISHED_YEAR INTEGER NOT NULL.
      p_isbn BIGINT UNIQUE NOT NULL,
      p_is_available BOOLEAN DEFAULT TRUE
)
RETURN TABLE(

      ID INTEGER,
      TITLE VARCHAR(255),
      AUTHOR VARCHAR(255),
      PUBLISHED_YEAR INTEGER NOT NULL,
      isbn BIGINT UNIQUE NOT NULL,
      is_available BOOLEAN DEFAULT TRUE
)AS $$            
DECLARE 
current_title VARCHAR(255)
BEGIN 
SELECT BOOKS.TITLE INTO current_title FROM BOOKS WHRE BOOKS.id   = P.id,

IF NOT FOUND THEN
RAISE EXCEPTION ' BOOK WITH ID % NOT FOUND',P_id;
END IF;


IF p_TITLE IS NOT NULL AND p_TITLE != current_title THEN
IF EXISTS (SELECT 1 FROM BOOKS WHERE BOOKS.TITLE = P.TITLE AND BOOKS.id != P.id) THEN

RAISE EXCEPTION 'Another book with this title already exists'

      END IF;
      END IF;

      RETURN QUERY
      UPDATE BOOKS SET 
      TITLE = COALESCE (p_TITLE, BOOKS.TITLE),
      AUTHOR = COALESCE (p_AUTHOR, BOOKS.AUTHOR),
      PUBLISHED_YEAR = (p_PUBLISHED_YEAR, BOOKS.PUBLISHED_YEAR),
      isbn = (p_isbn,  BOOKS.isbn),
      is_available = (p_is_available, BOOKS.is_available),

      WHERE BOOKS.id = P_id  
      RETURNING  title, author, published_year, isbn;
      END;
      
      $$ language plpgsql
                 