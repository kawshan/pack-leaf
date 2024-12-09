package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Company;
import com.packleaf.packleaf.entity.GrnDetails;
import com.packleaf.packleaf.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReportsDao extends JpaRepository<Company,Integer> {


      @Query("select gd from GrnDetails gd where gd.grnheader in (select gh.grnheaderkey from GrnHeader gh where gh.grndate between ?1 and ?2) and gd.rawmaterial_id.id=?3")
//    @Query(value = "select * from grndetails where grnheader in (select grnheaderkey from grnheader where grndate between ?1 and ?2 ) and rawmaterial_id=?3;",nativeQuery = true)
      public List<GrnDetails> getStockReportFromAndToDateAndRawMaterialId(LocalDate fromdate, LocalDate todate, String rawmaterialid);

//      @Query(value = "select gd.rawmaterial_id.rmname, gd.grnheader, gh.grndate, gh.supplier_id.suppliername, gd.quantity from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3")
      @Query(value = "select gd, gh from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3")
//    @Query(value = "select  rawmaterial_id, grnheaderkey as reference_key, grnheader.grndate, grnheader.supplier_id, quantity from grndetails inner join grnheader on grndetails.grnheader = grnheaderkey and rawmaterial_id=?1 and grnheader.grndate between ?2 and ?3;",nativeQuery = true)
      public List<Object[]> joinTablesResult(RawMaterial rawmaterialid, LocalDate fromdate, LocalDate todate);

}
