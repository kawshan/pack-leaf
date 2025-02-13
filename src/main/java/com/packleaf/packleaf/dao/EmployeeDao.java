package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeDao extends JpaRepository<Employee,Integer> {

    @Query(value = "select e from Employee e where e.id not in(select u.employee_id.id from User u where u.employee_id is not null )")
    public List<Employee> getEmployeeWithoutUserAccount();


}
