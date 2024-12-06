package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemDao extends JpaRepository<Item,Integer> {

    @Query(value = "SELECT CONCAT('IM', LPAD(MAX(CAST(SUBSTRING(i.imkey, 3) AS UNSIGNED)) + 1, 4, '0')) AS itemkey FROM packleaf.item AS i;",nativeQuery = true)
    public String getMaxItemKey();




}
