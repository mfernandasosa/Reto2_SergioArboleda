BEGIN
    INSERT INTO CLIENTE (ID, NAME, EMAIL, AGE)
    VALUES(:id, :name, :email, :age);
    :status_code := 201;
END;