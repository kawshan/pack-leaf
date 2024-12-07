package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.OurPoDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OurPoDetailDao extends JpaRepository<OurPoDetail,Integer> {

    @Query(value = "select opod from OurPoDetail opod where opod.ourpoheaderkey=?1")
    public List<OurPoDetail> getOurPoDetailByOurPoHeaderKey(String ourPoHeaderKey);




}
