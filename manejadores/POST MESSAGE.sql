BEGIN
    INSERT INTO MESSAGE (ID, MESSAGETEXT)
    VALUES(:id, :messagetext);
    :status_code := 201;
END;