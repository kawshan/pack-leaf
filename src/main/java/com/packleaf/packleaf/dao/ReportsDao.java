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
      public List<GrnDetails> getStockReportFromAndToDateAndRawMaterialId(LocalDate fromdate, LocalDate todate, String rawmaterialid);

//    @Query(value = "select gd, gh from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3")
      @Query(value = "select gd, gh from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3")
      public List<Object[]> joinTablesResultForGrn(RawMaterial rawmaterialid, LocalDate fromdate, LocalDate todate);


      @Query(value = "select ind, inh from IssueNoteDetail ind inner join IssueNoteHeader inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=?1 and inh.issuenotedate between ?2 and  ?3")
      public List<Object[]> joinTablesResultForIssueNote(RawMaterial rawmaterialid, LocalDate fromdate, LocalDate todate);


}
