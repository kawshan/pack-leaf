package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCategoryDao extends JpaRepository<ItemCategory,Integer> {
}
