package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.RoleDao;
import com.packleaf.packleaf.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleDao roleDao;

    @GetMapping(value = "/findall")
    public List<Role> findAll(){
        return roleDao.findAll();
    }

    @GetMapping(value = "/withoutadmin")
    public List<Role>getRoleListWithoutAdmin(){
        return roleDao.getRoleListWithoutAdmin();
    }


}
