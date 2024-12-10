package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.GrnDetails;
import com.packleaf.packleaf.entity.OurPoDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GrnDetailsDao extends JpaRepository<GrnDetails,Integer> {


    @Query(value = "select gd from GrnDetails gd where gd.grnheader=?1")
    public List<GrnDetails> findByGrnHeader(String grnHeader);


    @Query(value = "select (select sum(ourpodetail.qty) as total_po_quantity from ourpodetail where id=?1) - (select sum(grndetails.quantity) as total_grn_ed_quantity from grndetails where ourpodetail_id=?1) as final_remaining_quantity;",nativeQuery = true)
    public String getRemainingGrnDetailQuantity(String id);


    @Query(value = "select exists(select * from grndetails where ourpodetail_id=?1)",nativeQuery = true)
    public String getGrnDetailsByOurPoId(Integer ourpoid);

}
