package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CheckBookMasterDao;
import com.packleaf.packleaf.dao.CheckBookMasterStatusDao;
import com.packleaf.packleaf.entity.CheckBookMaster;
import com.packleaf.packleaf.entity.CheckBookMasterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/checkbookmaster")
public class CheckBookMasterController {

    @Autowired
    private CheckBookMasterDao checkBookMasterDao;

    @Autowired
    private CheckBookMasterStatusDao checkBookMasterStatusDao;


    @GetMapping
    public ModelAndView getChequeBookMasterView(){
        ModelAndView checkBookMasterUI = new ModelAndView();
        checkBookMasterUI.setViewName("checkbookmaster.html");
        return checkBookMasterUI;
    }


    @GetMapping(value = "/findall")
    public List<CheckBookMaster> findAll(){
        return checkBookMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping
    public String addChequeBookMaster(@RequestBody CheckBookMaster checkBookMaster){
        try {
            checkBookMasterDao.save(checkBookMaster);
            return "ok";
        }catch (Exception e){
            return "cheque book save not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateChequeBookMaster(@RequestBody CheckBookMaster checkBookMaster){
        try {
            checkBookMasterDao.save(checkBookMaster);
            return "ok";
        }catch (Exception e){
            return "cheque book update not complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteChequeBookMaster(@RequestBody CheckBookMaster checkBookMaster){
        CheckBookMasterStatus deleteStatus = checkBookMasterStatusDao.getReferenceById(3);
        try {
            checkBookMaster.setCheckbookmasterstatus_id(deleteStatus);
            checkBookMasterDao.save(checkBookMaster);
            return "ok";
        }catch (Exception e){
            return "Cheque Book Master Delete Not Complete"+e.getMessage();
        }
    }


    @GetMapping(value = "/getmaxrunningnumber")
    public String getMaxRunningNumber(){
        String existingRunningNumber = checkBookMasterDao.getMaxRunningNumber();
        if (existingRunningNumber==null || existingRunningNumber.equals("")){
            return "CB0001";
        }else {
            return checkBookMasterDao.getMaxRunningNumber();
        }


    }


}
