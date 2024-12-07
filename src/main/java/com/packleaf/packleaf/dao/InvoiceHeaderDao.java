package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.InvoiceHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InvoiceHeaderDao extends JpaRepository<InvoiceHeader,Integer> {


    @Query(value = "select CONCAT('IN',LPAD(MAX(SUBSTRING(i.inkey,3))+1,4,'0'))as  invoicekey from packleaf.invoiceheader as i;",nativeQuery = true)
    public String getInvoiceHeaderMaxInvoiceKey();
}
