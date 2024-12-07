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

}
