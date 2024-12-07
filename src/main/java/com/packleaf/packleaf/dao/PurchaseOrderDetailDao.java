package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.InvoiceDetail;
import com.packleaf.packleaf.entity.PurchaseOrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseOrderDetailDao extends JpaRepository<PurchaseOrderDetails,Integer> {



    @Query(value = "select * from podetail where purchaseorderkey=?1",nativeQuery = true)
    public List<PurchaseOrderDetails> getPurchaseOrderDetailsByPurchaseOrderKey(String purchaseOrderKey);


    //this comes from purchase order details when user types po number in invoice header section in browser window
    @Query(value = "select * from podetail where purchaseorderkey in (select pokey from poheader where pokey in (select pokey from invoiceheader where ponumber=?1));",nativeQuery = true)
    public List<PurchaseOrderDetails> getAvailablePurchaseOrderDetailsByPokeyInInvoiceHeader(String ponumber);


}
