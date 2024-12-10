package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.RawMaterialFormDao;
import com.packleaf.packleaf.entity.RawMaterialForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/rawmaterialform")
public class RawMaterialFormController {

    @Autowired
    private RawMaterialFormDao rawMaterialFormDao;

    @GetMapping(value = "/findall")
    public List<RawMaterialForm> getAllRawMaterialForm(){
        return rawMaterialFormDao.findAll();
    }


}
