CREATE OD REPLACE FUNCTION sp_get_all_books()
RETURNS SETOF BOOKS AS $$ 
BEGIN
     
     RETURN QUERY SELECT * FROM BOOKS ORDER BY TITLE ;
     END ;
     $$ language plpgsql;

     CREATE OR REPLACE FUNCTION sp_get_all_books()
     RETURNS SETOF BOOKS AS   $$
     BEGIN
     RETURN QUERY SELECT * from BOOKS WHERE is_available = TRUE ORDER by TITLE;
     END;
    $$ language plpgsql;




    CREATE or REPLACE FUNCTION sp_get_books_by_ID (p_id INTEGER)

    RETURN SETOF BOOKS as $$

    BEGIN
    RETURN QUERY SELECT * from BOOKS where ID = p.id;

    IF NOT FOUND THEN
    RAISE EXCEPTION 'GUEST WITH ID % NOT FOUND' P_id;
    END IF;
    END;
    $$ language plpgsql;


CREATE or REPLACE FUNCTION sp_get_books_by_PUBLISHED_YEAR(p_PUBLISHED_YEAR INTEGER)

    RETURN SETOF BOOKS as $$

    BEGIN
    RETURN QUERY SELECT * from BOOKS where PUBLISHED_YEAR = p.PUBLISHED_YEAR;

    IF NOT FOUND THEN
    RAISE EXCEPTION 'GUEST WITH ID % NOT FOUND' p_PUBLISHED_YEAR;
    END IF;
    END;
    $$ language plpgsql;
