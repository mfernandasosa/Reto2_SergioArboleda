BEGIN
    DELETE FROM MESSAGE
    WHERE ID = :id;
    :status_code :=204;
END;