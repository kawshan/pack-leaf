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

}
