package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.BankShortNameDao;
import com.packleaf.packleaf.entity.BankShortName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bankshortname")
public class BankShortNameController {

    @Autowired
    private BankShortNameDao bankShortNameDao;

    @GetMapping(value = "/findall")
    public List<BankShortName> getAllBankShortNames(){
        return bankShortNameDao.findAll();
    }


}
