package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategoryDao extends JpaRepository<ItemCategory,Integer> {

    @Query(value = "select ic from ItemCategory ic where ic.ctname=?1")
public ItemCategory findByCtname(String ctname);


}
