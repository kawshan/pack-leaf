package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatusDao extends JpaRepository<EmployeeStatus,Integer> {
}
