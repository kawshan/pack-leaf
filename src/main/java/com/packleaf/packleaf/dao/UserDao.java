package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,Integer> {
}
