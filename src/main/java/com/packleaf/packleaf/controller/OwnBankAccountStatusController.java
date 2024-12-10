package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.OwnBankAccountStatusDao;
import com.packleaf.packleaf.entity.OwnBankAccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/ownbankaccountstatus")
public class OwnBankAccountStatusController {

    @Autowired
    private OwnBankAccountStatusDao ownBankAccountStatusDao;

    @GetMapping(value = "/findall")
    public List<OwnBankAccountStatus> findAllOwnBankAccountStatus(){
        return ownBankAccountStatusDao.findAll();
    }


}
