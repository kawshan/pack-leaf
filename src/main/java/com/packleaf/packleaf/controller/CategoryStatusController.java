package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CategoryStatusDao;
import com.packleaf.packleaf.entity.CategoryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/categorystatus")
public class CategoryStatusController {

    @Autowired
    private CategoryStatusDao categoryStatusDao;

    @GetMapping(value = "/findall")
    public List<CategoryStatus> getAllCategoryStatus() {
        return categoryStatusDao.findAll();
    }


}
