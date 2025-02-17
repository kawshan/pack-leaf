package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.PurchaseOrderHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseOrderHeaderDao extends JpaRepository<PurchaseOrderHeader,Integer> {



    @Query(value = "SELECT CONCAT('PO', LPAD(MAX(SUBSTRING(poh.pokey, 3)) + 1, 4, '0')) AS purchaseorderheaderKey FROM poheader AS poh;",nativeQuery = true)
    public String getMaxPurchaseOrderHeaderKey();


    @Query(value = "select id from poheader where pokey=?1",nativeQuery = true)
    public String getIdFromPokey(String pokey);

    @Query(value = "select pokey from poheader where ponumber=?1",nativeQuery = true)
    public String getPoKeyFromPoNumber(String ponumber);

    @Modifying
    @Transactional
    @Query(value = "delete from podetail where purchaseorderkey=?1",nativeQuery = true)
    public void deletePoDetailsFromPoKey(String pokey);

    @Query(value = "select poh from PurchaseOrderHeader poh where poh.ponumber=?1")
    public PurchaseOrderHeader getPurchaseOrderHeaderByPoNumber(String ponumber);


}
