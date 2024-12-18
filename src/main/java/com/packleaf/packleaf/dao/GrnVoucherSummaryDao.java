package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GrnVoucherSummaryDao extends JpaRepository<Company,Integer> {


    @Query(value = "select distinct grnheader.grndate, grnheader.grnno, (select suppliername from supplier where id=grnheader.supplier_id) as supplier_name, (select sum(quantity) from grndetails where grndetails.grnheader = grnheader.grnheaderkey) as total_quantity from grnheader inner join grndetails on grnheader.grnheaderkey = grndetails.grnheader where grndate between ?1 and ?2 order by grndate asc",nativeQuery = true)
    public List<Object> getGrnSummery(String fromDate,String toDate);




}
