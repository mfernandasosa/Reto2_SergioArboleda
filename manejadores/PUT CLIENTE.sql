BEGIN
    UPDATE CLIENTE
    SET NAME = :name,
       EMAIL = :email,
       AGE   = :age
    WHERE ID = :id;
    :status_code := 201;
END;