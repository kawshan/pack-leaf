package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.GrnHeader;
import com.packleaf.packleaf.entity.OurPoDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GrnHeaderDao extends JpaRepository<GrnHeader,Integer> {

    @Query(value = "select concat('GRN',lpad(max(substring(grnheader.grnheaderkey,4))+1,4,'0')) as grn_header_key from grnheader;",nativeQuery = true)
    public String getMaxGrnHeaderKey();


    @Query(value = "select gh.id from GrnHeader gh where gh.grnheaderkey=?1")
    public Integer getGrnHeaderIdByGrnHeaderKey(String grnHeaderKey);


    @Transactional
    @Modifying
    @Query(value = "delete from grndetails where grnheader=?1",nativeQuery = true)
    public void deleteAllFromGrnDetailsByGrnHeader(String grnHeaderKey);


//    @Query(value = "select * from ourpodetail where ourpoheaderkey in (select ourpokey from ourpoheader where ourponumber=?1); ",nativeQuery = true)
//    @Query(value = "select * from ourpodetail where ourpoheaderkey = (select ourpokey from ourpoheader where ourponumber=?1)",nativeQuery = true)
    @Query(value = "select opd from OurPoDetail opd where opd.ourpoheaderkey = (select oph.ourpokey from OurPoHeader oph where oph.ourponumber=?1 )")
    public List<OurPoDetail> getOurPoDetailsFromPoNumber(String ourponumber);

}
