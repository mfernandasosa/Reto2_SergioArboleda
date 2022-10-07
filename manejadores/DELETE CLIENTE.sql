BEGIN
    DELETE FROM CLIENTE
    WHERE ID = :id;
    :status_code :=204;
END;