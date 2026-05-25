package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AllItemStockReportDao extends JpaRepository<Item,Integer> {


    @Query(value = "SELECT rm.id, rm.rmkey, rm.rmname, rmc.rmctname, rm.rmpacking, COALESCE(grn.total_grn_qty, 0) - COALESCE(issue_note.total_issue_qty, 0) + COALESCE(adj.total_adjustment_qty, 0) AS available_stock, COALESCE(latest_grn.last_grn_rate, latest_adj.last_adjustment_rate) AS latest_rate, COALESCE(latest_grn.last_grn_date, latest_adj.last_adjustment_date) AS latest_rate_date FROM rawmaterial rm LEFT JOIN rawmaterialcategory rmc ON rmc.id = rm.rawmaterialcategory_id LEFT JOIN ( SELECT gd.rawmaterial_id, SUM(gd.quantity) AS total_grn_qty FROM grndetails gd INNER JOIN grnheader gh ON gh.grnheaderkey = gd.grnheader WHERE gh.grndate BETWEEN ?1 AND ?2 GROUP BY gd.rawmaterial_id ) grn ON rm.id = grn.rawmaterial_id LEFT JOIN ( SELECT ind.rawmaterial_id, SUM(ind.quantity) AS total_issue_qty FROM issuenotedetail ind INNER JOIN issuenoteheader inh ON inh.headerkey = ind.issuenoteheader WHERE inh.issuenotedate BETWEEN ?1 AND ?2 GROUP BY ind.rawmaterial_id ) issue_note ON rm.id = issue_note.rawmaterial_id LEFT JOIN ( SELECT sad.rawmaterial_id, SUM(sad.quantity) AS total_adjustment_qty FROM stock_adjustment_details sad INNER JOIN stock_adjustment_header sah ON sah.adjustment_key = sad.header_key WHERE sah.adjustment_date BETWEEN ?1 AND ?2 GROUP BY sad.rawmaterial_id ) adj ON rm.id = adj.rawmaterial_id LEFT JOIN ( SELECT gd1.rawmaterial_id, MAX(gd1.rate) AS last_grn_rate, MAX(gh1.grndate) AS last_grn_date FROM grndetails gd1 INNER JOIN grnheader gh1 ON gh1.grnheaderkey = gd1.grnheader WHERE gd1.id IN ( SELECT MAX(gd2.id) FROM grndetails gd2 GROUP BY gd2.rawmaterial_id ) GROUP BY gd1.rawmaterial_id ) latest_grn ON rm.id = latest_grn.rawmaterial_id LEFT JOIN ( SELECT sad1.rawmaterial_id, MAX(sad1.rate) AS last_adjustment_rate, MAX(sah1.adjustment_date) AS last_adjustment_date FROM stock_adjustment_details sad1 INNER JOIN stock_adjustment_header sah1 ON sah1.adjustment_key = sad1.header_key WHERE sad1.id IN ( SELECT MAX(sad2.id) FROM stock_adjustment_details sad2 GROUP BY sad2.rawmaterial_id ) GROUP BY sad1.rawmaterial_id ) latest_adj ON rm.id = latest_adj.rawmaterial_id ORDER BY rmc.rmctname ASC, rm.rmname ASC;",nativeQuery = true)
    public List<Object[]> findAllItemStockReport(String fromDate, String toDate);





}
