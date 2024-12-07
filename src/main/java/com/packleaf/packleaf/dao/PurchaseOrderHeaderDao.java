package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.PurchaseOrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseOrderHeaderDao extends JpaRepository<PurchaseOrderHeader,Integer> {



    @Query(value = "SELECT CONCAT('PO', LPAD(MAX(SUBSTRING(poh.pokey, 3)) + 1, 4, '0')) AS purchaseorderheaderKey FROM poheader AS poh;",nativeQuery = true)
    public String getMaxPurchaseOrderHeaderKey();


    @Query(value = "select id from poheader where pokey=?1",nativeQuery = true)
    public String getIdFromPokey(String pokey);




}
