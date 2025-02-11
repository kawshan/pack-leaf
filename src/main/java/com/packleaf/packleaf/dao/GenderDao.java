package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderDao extends JpaRepository<Gender,Integer> {
}
