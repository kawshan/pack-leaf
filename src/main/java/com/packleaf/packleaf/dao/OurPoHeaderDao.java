package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.OurPoHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface OurPoHeaderDao extends JpaRepository<OurPoHeader,Integer> {


    @Query(value = "select concat('OPO',lpad(max(substring(ourpoheader.ourpokey,4))+1,4,'0')) as our_po_header_key from ourpoheader;",nativeQuery = true)
    public String maxOurPoHeaderKey();


    @Query(value = "select opo.id from OurPoHeader opo where opo.ourpokey=?1")
    public String getOPOIdFromOpoKey(String opokey);

    @Transactional
    @Modifying
    @Query(value = "delete from ourpodetail where ourpoheaderkey=?1",nativeQuery = true)
    public void removeOurPoDetailsFromOPOHeaderKey(String opokey);

}
