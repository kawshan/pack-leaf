package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.OwnBankAccountDao;
import com.packleaf.packleaf.dao.OwnBankAccountStatusDao;
import com.packleaf.packleaf.entity.OwnBankAccount;
import com.packleaf.packleaf.entity.OwnBankAccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/ownbankaccount")
public class OwnBankAccountController {

    @Autowired
    private OwnBankAccountDao ownBankAccountDao;

    @Autowired
    private OwnBankAccountStatusDao ownBankAccountStatusDao;


    @GetMapping
    public ModelAndView ownBankAccountView(){
        ModelAndView ownBankAccountUI = new ModelAndView();
        ownBankAccountUI.setViewName("ownbankaccountmaster.html");
        return ownBankAccountUI;
    }

    @GetMapping(value = "/findall")
    public List<OwnBankAccount> getAllOwnBankAccounts(){
        return ownBankAccountDao.findAll();
    }


    @PostMapping
    public String saveOwnBankAccount(@RequestBody OwnBankAccount ownBankAccount){
        try {
            String getNextMaxOwnAccountKey = ownBankAccountDao.getMaxOwnBankAccountKey();
            if (getNextMaxOwnAccountKey==null || getNextMaxOwnAccountKey.equals("")){
                ownBankAccount.setBank_key("ACC0001");
            }else {
                ownBankAccount.setBank_key(getNextMaxOwnAccountKey);;
            }
            ownBankAccountDao.save(ownBankAccount);
            return "ok";
        }catch (Exception e){
            return "Own Bank Account not saved"+e.getMessage();
        }
    }


    @PutMapping
    public String updateOwnBankAccount(@RequestBody OwnBankAccount ownBankAccount){
        try {
            ownBankAccountDao.save(ownBankAccount);
            return "ok";
        }catch (Exception e){
            return "Own Bank Account Update Not Complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteOwnBankAccount(@RequestBody OwnBankAccount ownBankAccount){
        try {
            OwnBankAccountStatus deleteStatus = ownBankAccountStatusDao.getReferenceById(3);
            ownBankAccount.setOwnbankaccountstatus_id(deleteStatus);
            ownBankAccountDao.save(ownBankAccount);
            return "ok";
        }catch (Exception e){
            return "Own Bank Account Delete Not Complete"+e.getMessage();
        }
    }
}
