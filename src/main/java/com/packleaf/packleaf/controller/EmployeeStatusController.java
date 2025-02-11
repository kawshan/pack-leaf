package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.EmployeeStatusDao;
import com.packleaf.packleaf.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/employeestatus")
public class EmployeeStatusController {

    @Autowired
    private EmployeeStatusDao employeeStatusDao;


    @GetMapping(value = "/findall")
    public List<EmployeeStatus>getAllEmployeeStatus(){
        return employeeStatusDao.findAll();
    }


}
