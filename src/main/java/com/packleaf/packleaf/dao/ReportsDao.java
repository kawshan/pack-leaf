package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Company;
import com.packleaf.packleaf.entity.GrnDetails;
import com.packleaf.packleaf.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;

import java.time.LocalDate;
import java.util.List;

public interface ReportsDao extends JpaRepository<Company,Integer> {


      @Query("select gd from GrnDetails gd where gd.grnheader in (select gh.grnheaderkey from GrnHeader gh where gh.grndate between ?1 and ?2) and gd.rawmaterial_id.id=?3")
      public List<GrnDetails> getStockReportFromAndToDateAndRawMaterialId(LocalDate fromdate, LocalDate todate, String rawmaterialid);

//    @Query(value = "select gd, gh from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3")
      @Query(value = "select gd, gh from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3 order by gh.grndate asc ")
      public List<Object[]> joinTablesResultForGrn(RawMaterial rawmaterialid, LocalDate fromdate, LocalDate todate);


      @Query(value = "select ind, inh from IssueNoteDetail ind inner join IssueNoteHeader inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=?1 and inh.issuenotedate between ?2 and  ?3 order by inh.issuenotedate asc ")
      public List<Object[]> joinTablesResultForIssueNote(RawMaterial rawmaterialid, LocalDate fromdate, LocalDate todate);


      @Query(value = "select (select sum(gd.quantity) from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and rawmaterial_id =?1 and gh.grndate < ?2) - (select sum(ind.quantity) from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id =?1 and inh.issuenotedate < ?2) as total_grn_and_issue_note_quantity;", nativeQuery = true)
      public String getRemainingQuantityFromGrnAndIssueNote(Integer rawmaterialid, String fromdate);


//      select gh.grndate as dates, gh.supplier_id as supplier_name, substring(gh.grnheaderkey,1,3) as code_type, gd.quantity from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=10 and gh.grndate between '2024-11-01' and '2024-11-24'
//      union all
//      select inh.issuenotedate as dates, '' as supplier_name, substring(inh.headerkey,1,2) as code_type, ind.quantity from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=10 and inh.issuenotedate between '2024-11-01' and '2024-11-24' order by dates asc;
//        @Query(value = "select gh.grndate dates, substring(gh.grnheaderkey,1,3) code_type, gd.quantity from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3 union all select inh.issuenotedate dates, substring(inh.headerkey,1,2) code_type, ind.quantity from IssueNoteDetail ind inner join IssueNoteHeader inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=?1 and inh.issuenotedate between ?2 and ?3 order by dates desc")
        @Query(value = "select gh.grndate as dates, (select suppliername from supplier where id=gh.supplier_id) as supplier_name, substring(gh.grnheaderkey,1,3) as code_type, gd.quantity from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3 union all select inh.issuenotedate as dates, '' as supplier_name, substring(inh.headerkey,1,2) as code_type, ind.quantity from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=?1 and inh.issuenotedate between ?1 and ?2 order by dates asc;",nativeQuery = true)
        public List<Object[]> finalJoinTableResult(Integer rawmaterialid, LocalDate fromdate, LocalDate todate);











}
