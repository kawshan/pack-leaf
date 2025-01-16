package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierDao extends JpaRepository<Supplier,Integer> {

    @Query(value = "select concat('SUP',lpad(max(substring(s.supplierkey,4))+1,4,'0')) as supkey from supplier as s;",nativeQuery = true)
    public String getSupplierMaxKey();


    @Query(value = "select s from Supplier s where s.suppliername=?1")
    public Supplier getSupplierBySupplierName(String supplierName);


}
