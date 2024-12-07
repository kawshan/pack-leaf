package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CompanyDao;
import com.packleaf.packleaf.entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/company")
public class CompanyController {

    @Autowired
    private CompanyDao companyDao;


    @GetMapping(value = "/findall")
    public List<Company> findAll(){
        return companyDao.findAll();
    }


}
