package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RawMaterialDao extends JpaRepository<RawMaterial,Integer> {



    @Query(value = "select concat('RM',LPAD(MAX(SUBSTRING(rm.rmkey,3)) +1,4,'0' )) as rawmaterialkey from rawmaterial as rm;",nativeQuery = true)
    public String getMaxRawMaterialKey();


    @Query(value = "select rm from RawMaterial rm where rm.rmstatus=true order by rm.id desc")
    public List<RawMaterial> getAllByRmStatusTrue();


}
