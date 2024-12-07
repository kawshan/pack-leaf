package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.PurchaseOrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseOrderDetailDao extends JpaRepository<PurchaseOrderDetails,Integer> {



    @Query(value = "select * from podetail where purchaseorderkey=?1",nativeQuery = true)
    public List<PurchaseOrderDetails> getPurchaseOrderDetailsByPurchaseOrderKey(String purchaseOrderKey);


}
