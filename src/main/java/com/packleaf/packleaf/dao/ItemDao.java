package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemDao extends JpaRepository<Item,Integer> {

    @Query(value = "SELECT CONCAT('IM', LPAD(MAX(CAST(SUBSTRING(i.imkey, 3) AS UNSIGNED)) + 1, 4, '0')) AS itemkey FROM packleaf.item AS i;",nativeQuery = true)
    public String getMaxItemKey();

    @Query(value = "select i from Item i where i.itmname=?1")
    public Item getItemByItemName(String itemName);

    //meka ona venne job master eke dan item ekata thiyenne many to many relation ekak nisa.

    @Query(value = "select i from Item i where i.id not in (select jmhi.item_id.id from JobMasterHasItem jmhi where jmhi.jobmaster_id.id=?1)order by i.code asc")
    public List<Item> getJobWithoutItems(Integer jobmasterId);



}
