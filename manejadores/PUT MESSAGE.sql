BEGIN
    UPDATE MESSAGE
    SET MESSAGETEXT = :messagetext
    WHERE ID = :id;
    :status_code := 201;
END;