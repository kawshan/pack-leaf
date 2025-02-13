package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleDao extends JpaRepository<Role,Integer> {

    @Query(value = "select r from Role r where r.name <> 'admin' ")
    public List<Role> getRoleListWithoutAdmin();


}
