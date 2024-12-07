package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyDao extends JpaRepository<Company,Integer> {
}
