package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.InvoiceHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceHeaderDao extends JpaRepository<InvoiceHeader,Integer> {


    @Query(value = "select CONCAT('IN',LPAD(MAX(SUBSTRING(i.inkey,3))+1,4,'0'))as  invoicekey from packleaf.invoiceheader as i;",nativeQuery = true)
    public String getInvoiceHeaderMaxInvoiceKey();


    @Query(value = "select ih from InvoiceHeader ih where ih.invno like concat(?1,'%') ")
    public InvoiceHeader getInvoiceHeaderByInvNo(String invno);


    @Query(value = "select * from invoiceheader where inkey = (select MAX(inkey) from invoiceheader);",nativeQuery = true)
    public List<InvoiceHeader> getMostRecentInvoiceHeader();


    @Query(value = "select id from invoiceheader where inkey=?1",nativeQuery = true)
    public Integer getIdFromInvoiceKey(String invoicekey);


    @Query(value = "select ih from InvoiceHeader ih where ih.ponumber=?1")
    public InvoiceHeader getInvoiceHeaderByPoNumber(String ponumber);


    @Query(value = "select ih from InvoiceHeader ih where ih.pokey=?1")
    public InvoiceHeader getInvoiceHeaderByPokey(String pokey);


}
