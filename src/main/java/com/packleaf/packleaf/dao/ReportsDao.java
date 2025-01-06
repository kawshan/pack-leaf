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

//      me query eka wada karanne na 0 values walata ee nisa query eka update kara
//      @Query(value = "select (select sum(gd.quantity) from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and rawmaterial_id =?1 and gh.grndate < ?2) - (select sum(ind.quantity) from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id =?1 and inh.issuenotedate < ?2) as total_grn_and_issue_note_quantity;", nativeQuery = true)
    @Query(value = "SELECT (SELECT COALESCE(SUM(gd.quantity), 0) FROM grndetails AS gd INNER JOIN grnheader AS gh ON gd.grnheader = gh.grnheaderkey WHERE gd.rawmaterial_id = ?1 AND gh.grndate < ?2) - (SELECT COALESCE(SUM(ind.quantity), 0) FROM issuenotedetail AS ind INNER JOIN issuenoteheader AS inh ON inh.headerkey = ind.issuenoteheader WHERE ind.rawmaterial_id = ?1 AND inh.issuenotedate < ?2 ) AS previous_quantity;",nativeQuery = true)
      public String getRemainingQuantityFromGrnAndIssueNote(Integer rawmaterialid, String fromdate);


//      select gh.grndate as dates, gh.supplier_id as supplier_name, substring(gh.grnheaderkey,1,3) as code_type, gd.quantity from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=10 and gh.grndate between '2024-11-01' and '2024-11-24'
//      union all
//      select inh.issuenotedate as dates, '' as supplier_name, substring(inh.headerkey,1,2) as code_type, ind.quantity from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=10 and inh.issuenotedate between '2024-11-01' and '2024-11-24' order by dates asc;
//      @Query(value = "select gh.grndate dates, substring(gh.grnheaderkey,1,3) code_type, gd.quantity from GrnDetails gd inner join GrnHeader gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3 union all select inh.issuenotedate dates, substring(inh.headerkey,1,2) code_type, ind.quantity from IssueNoteDetail ind inner join IssueNoteHeader inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=?1 and inh.issuenotedate between ?2 and ?3 order by dates desc")
//      me query eka thama stock adjustment ekata kalin use kare
//        @Query(value = "select gh.grndate as dates, (select suppliername from supplier where id=gh.supplier_id) as supplier_name, substring(gh.grnheaderkey,1,3) as code_type, gd.quantity from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3 union all select inh.issuenotedate as dates, '' as supplier_name, substring(inh.headerkey,1,2) as code_type, ind.quantity from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and ind.rawmaterial_id=?1 and inh.issuenotedate between ?1 and ?2 order by dates asc;",nativeQuery = true)
//
//      dan thiyenne aluth ma query eka stock adjustment eka dammata passe
        @Query(value = "select\n" +
                "gh.grndate as dates,\n" +
                "(select suppliername from supplier where id=gh.supplier_id) as supplier_name,\n" +
                "substring(gh.grnheaderkey,1,3) as code_type,\n" +
                "gd.quantity from grndetails as gd inner join grnheader as gh on gd.grnheader = gh.grnheaderkey and\n" +
                "gd.rawmaterial_id=?1 and gh.grndate between ?2 and ?3 \n" +
                "union all\n" +
                "select\n" +
                "inh.issuenotedate as dates,\n" +
                "'' as supplier_name,\n" +
                "substring(inh.headerkey,1,2) as code_type,\n" +
                "ind.quantity\n" +
                "from issuenotedetail as ind inner join issuenoteheader as inh on ind.issuenoteheader = inh.headerkey and\n" +
                "ind.rawmaterial_id=?1 and inh.issuenotedate between ?2 and ?3 \n" +
                "union all\n" +
                "select\n" +
                "sah.adjustment_date as dates,\n" +
                "'' as supplier_name,\n" +
                "substring(sah.adjustment_key,1,3) as code_type,\n" +
                "sad.quantity\n" +
                "from stock_adjustment_details as sad inner join stock_adjustment_header as sah on sah.adjustment_key = sad.header_key\n" +
                "and sad.rawmaterial_id=?1 and sah.adjustment_date between ?2 and ?3 \n" +
                "order by dates asc;",nativeQuery = true)
        public List<Object[]> finalJoinTableResult(Integer rawmaterialid, LocalDate fromdate, LocalDate todate);











}
