BEGIN
    DELETE FROM cabin WHERE ID = :id;
    :status_code:=204;
  END;