package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.DesignationDao;
import com.packleaf.packleaf.entity.Designation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/designation")
public class DesignationController {

    @Autowired
    private DesignationDao designationDao;

    @GetMapping(value = "/findall")
    private List<Designation> findAll() {
        return designationDao.findAll();
    }

}
