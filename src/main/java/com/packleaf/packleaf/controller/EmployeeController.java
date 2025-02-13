package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.EmployeeDao;
import com.packleaf.packleaf.dao.EmployeeStatusDao;
import com.packleaf.packleaf.entity.Employee;
import com.packleaf.packleaf.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private EmployeeStatusDao employeeStatusDao;

    @GetMapping(value = "/findall")
    public List<Employee>getAllEmployees(){
        return employeeDao.findAll();
    }


    @GetMapping
    private ModelAndView employeeView(){
        ModelAndView employeeUI = new ModelAndView();
        employeeUI.setViewName("employeemaster.html");
        return employeeUI;
    }

    @PostMapping
    private String saveEmployee(@RequestBody Employee employee){
        try {
            employeeDao.save(employee);
            return "ok";
        }catch (Exception e){
            return "employee save not successful"+e.getMessage();
        }
    }



    @PutMapping
    public String updateEmployee(@RequestBody Employee employee){
        try {
            employeeDao.save(employee);
            return "ok";
        }catch (Exception e){
            return "employee update not successful"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteEmployee(@RequestBody Employee employee){
        try {
             EmployeeStatus deleteStatus = employeeStatusDao.getReferenceById(3);
             employee.setEmployeestatus_id(deleteStatus);
             employeeDao.save(employee);
             return "ok";
        }catch (Exception e){
            return "employee delete not successful"+e.getMessage();
        }
    }

    @GetMapping(value = "/withoutuseraccount")
    public List<Employee> getListWithoutUserAccount(){
        return employeeDao.getEmployeeWithoutUserAccount();
    }



}
