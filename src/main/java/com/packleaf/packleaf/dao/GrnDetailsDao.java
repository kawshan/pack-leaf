package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.GrnDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GrnDetailsDao extends JpaRepository<GrnDetails,Integer> {


    @Query(value = "select gd from GrnDetails gd where gd.grnheader=?1")
    public List<GrnDetails> findByGrnHeader(String grnHeader);

}
