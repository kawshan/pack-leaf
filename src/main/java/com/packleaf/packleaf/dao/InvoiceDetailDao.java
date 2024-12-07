package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceDetailDao extends JpaRepository<InvoiceDetail,Integer> {



    @Query(value = "select max(inkey) from invoiceheader;",nativeQuery = true)
    public String getMaxInKey();


    @Query(value = "select * from invoicedetail where invoicekey=?1",nativeQuery = true)
    public List<InvoiceDetail> getAllInvoiceDetailByInvoiceKey(String invoicekey);

    //api invoice key eka dunnama total value eka aran denawa
    @Query(value = "select SUM(invvalue) from invoicedetail where invoicekey=?1;",nativeQuery = true)
    public String getTotalValueByInvoiceKey(String invoicekey);

    //invoice header eke max eka aran eka invoice detail eke invoice key ekata thiyenawada balanawa
    @Query(value = "select * from invoicedetail where invoicekey = (select max(inkey) from invoiceheader);",nativeQuery = true)
    public List<InvoiceDetail> getInvoiceDetailByMaxInvoiceKey();


    //create query to get total quantity value from invoice key
    @Query(value = "select SUM(invqty) from invoicedetail where invoicekey=?1",nativeQuery = true)
    public String getTotalQuantityFromInvoiceKey(String invoicekey);


    @Query(value = "select (select sum(podetail.poqty) as total_poqty FROM podetail where id=?1) - (select sum(invoicedetail.invqty) as total_invqty FROM invoicedetail where podetail_id=?1) as remaining;",nativeQuery = true)
    public String getRemainingQuantityFromPoDetailId(String podetailid);


    @Query(value = "select podetail.poqty from podetail where id=?1",nativeQuery = true)
    public String getPoQtyFromId(String id);


}
