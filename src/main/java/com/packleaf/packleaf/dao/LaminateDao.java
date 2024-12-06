package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.CategoryStatus;
import com.packleaf.packleaf.entity.Laminate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaminateDao extends JpaRepository<Laminate, Integer> {

}
