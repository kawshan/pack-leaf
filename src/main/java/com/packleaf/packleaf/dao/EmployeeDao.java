package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDao extends JpaRepository<Employee,Integer> {




}
