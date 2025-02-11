package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.GenderDao;
import com.packleaf.packleaf.entity.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/gender")
public class GenderController {

    @Autowired
    private GenderDao genderDao;

    @GetMapping(value = "/findall")
    public List<Gender> findAll() {
        return genderDao.findAll();
    }




}
