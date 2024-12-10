package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.IssueChequeStatusDao;
import com.packleaf.packleaf.entity.IssueChequeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/issuechequestatus")
public class IssueChequeStatusController {

    @Autowired
    private IssueChequeStatusDao issueChequeStatusDao;

    @GetMapping(value = "/findall")
    public List<IssueChequeStatus> findAllIssueChequeStatues(){
        return issueChequeStatusDao.findAll();
    }


}
