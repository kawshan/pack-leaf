package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.FinishingTypesDao;
import com.packleaf.packleaf.entity.FinishingTypes;
import com.packleaf.packleaf.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/finishing_types")
public class FinishingTypesController {

    @Autowired
    private FinishingTypesDao finishingTypesDao;


    @GetMapping(value = "/findall")
    public List<FinishingTypes> getAllFinishingTypes() {
        return finishingTypesDao.findAll();
    }


    //meka apita one venne job master eke many to many relation eka nisa -> refill ekedi daapu nathi item tika ganna one nisa
    @GetMapping(value = "/jobwithoutfinishingtypes/{jobmasterId}")
    public List<FinishingTypes> getJobWithoutItems(@PathVariable Integer jobmasterId){
        return finishingTypesDao.getJobWithoutItems(jobmasterId);
    }



}
