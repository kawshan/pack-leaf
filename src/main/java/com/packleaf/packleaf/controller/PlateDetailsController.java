package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.PlateDetailsDao;
import com.packleaf.packleaf.entity.PlateDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/plate_details")
public class PlateDetailsController {

    @Autowired
    private PlateDetailsDao plateDetailsDao;

    @GetMapping(value = "/find_all")
    public List<PlateDetails> findAll() {
        return plateDetailsDao.findAll();
    }



}
