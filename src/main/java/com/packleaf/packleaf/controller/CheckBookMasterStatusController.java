package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CheckBookMasterStatusDao;
import com.packleaf.packleaf.entity.CheckBookMasterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/checkbookstatus")
public class CheckBookMasterStatusController {

    @Autowired
    private CheckBookMasterStatusDao checkBookMasterStatusDao;

    @GetMapping(value = "/findall")
    public List<CheckBookMasterStatus> findAllCheckBookMasterStatus(){
        return checkBookMasterStatusDao.findAll();
    }

}
