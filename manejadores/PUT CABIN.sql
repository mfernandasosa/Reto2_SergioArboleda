BEGIN
    UPDATE cabin SET BRAND=:brand, ROOMS=:rooms, CATEGORY_ID=:category_id, NAME=:name WHERE ID=:id;
    :status_code:=201;
  END;