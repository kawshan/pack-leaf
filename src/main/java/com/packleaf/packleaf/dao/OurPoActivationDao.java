package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.OurPoActivation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OurPoActivationDao extends JpaRepository<OurPoActivation,Integer> {

    @Query(value = "select opoa from OurPoActivation opoa where opoa.ourpoheader_id.id=?1")
    public OurPoActivation validateExistingOurPoActivation(int id);


    @Query(value = "select opoa from OurPoActivation opoa where opoa.ourpoheader_id.ourponumber=?1 and opoa.activation_status=true")
    public OurPoActivation getOurPoActivationByOurPoNumber(String ourpoNumber);


}
