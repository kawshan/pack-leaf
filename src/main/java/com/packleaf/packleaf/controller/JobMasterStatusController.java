package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.JobMasterStatusDao;
import com.packleaf.packleaf.entity.JobMasterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/jobmasterstatus")
public class JobMasterStatusController {

    @Autowired
    private JobMasterStatusDao jobMasterStatusDao;

    @GetMapping(value = "/findall")
    public List<JobMasterStatus> findAllJobMasterStatus(){
        return jobMasterStatusDao.findAll();
    }



}
