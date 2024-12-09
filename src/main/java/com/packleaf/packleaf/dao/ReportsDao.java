package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Company;
import com.packleaf.packleaf.entity.GrnDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReportsDao extends JpaRepository<Company,Integer> {


      @Query("select gd from GrnDetails gd where gd.grnheader in (select gh.grnheaderkey from GrnHeader gh where gh.grndate between ?1 and ?2) and gd.rawmaterial_id.id=?3")
//    @Query(value = "select * from grndetails where grnheader in (select grnheaderkey from grnheader where grndate between ?1 and ?2 ) and rawmaterial_id=?3;",nativeQuery = true)
      public List<GrnDetails> getStockReportFromAndToDateAndRawMaterialId(LocalDate fromdate, LocalDate todate, String rawmaterialid);



}
