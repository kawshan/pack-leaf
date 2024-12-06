package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CategoryStatusDao;
import com.packleaf.packleaf.dao.LaminateDao;
import com.packleaf.packleaf.entity.CategoryStatus;
import com.packleaf.packleaf.entity.Laminate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/laminate")
public class LaminateController {

    @Autowired
    private LaminateDao laminateDao;

    @GetMapping(value = "/findall")
    public List<Laminate> getAllCategoryStatus() {
        return laminateDao.findAll();

    }


}
