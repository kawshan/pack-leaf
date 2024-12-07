package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.RawMaterialCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RawMaterialCategoryDao extends JpaRepository<RawMaterialCategory,Integer> {

    @Query(value = "select concat('RMC',LPAD(MAX(SUBSTRING(rmc.rmctkey,4))+1,4,'0')) as rowmaterialcategorykey from rawmaterialcategory as rmc;",nativeQuery = true)
    public String getMaxRawMaterialCategory();


}
