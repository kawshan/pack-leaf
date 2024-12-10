package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.IssueChequeDao;
import com.packleaf.packleaf.dao.IssueChequeStatusDao;
import com.packleaf.packleaf.entity.IssueCheque;
import com.packleaf.packleaf.entity.IssueChequeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/issuecheque")
public class IssueChequeController {

    @Autowired
    private IssueChequeDao issueChequeDao;

    @Autowired
    private IssueChequeStatusDao issueChequeStatusDao;


    @GetMapping(value = "/findall")
    public List<IssueCheque> findAllIssueCheque(){
        return issueChequeDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView getIssueChequeView(){
        ModelAndView issueChequeUI = new ModelAndView();
        issueChequeUI.setViewName("issuecheque.html");
        return issueChequeUI;
    }


    @PostMapping
    public String saveIssueCheque(@RequestBody IssueCheque issueCheque){
        try {
            String getMaxIssueCheque = issueChequeDao.getMaxChequeCode();
            if (getMaxIssueCheque==null || getMaxIssueCheque.equals("")){
                issueCheque.setIssue_cheque_code("IC0001");
            }else {
                issueCheque.setIssue_cheque_code(getMaxIssueCheque);
            }


            issueChequeDao.save(issueCheque);
            return "ok";
        }catch (Exception e){
            return "save Issue Cheque Not Completed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateIssueCheque(@RequestBody IssueCheque issueCheque){
        try {
            issueChequeDao.save(issueCheque);
            return "ok";
        }catch (Exception e){
            return "Update Issue Cheque Not Complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteIssueCheque(@RequestBody IssueCheque issueCheque){
        try {
            IssueChequeStatus deleteStatus = issueChequeStatusDao.getReferenceById(3);
            issueCheque.setIssuechequestatus_id(deleteStatus);
            issueChequeDao.save(issueCheque);
            return "ok";
        }catch (Exception e){
            return "delete issue Cheque Not Completed";
        }
    }





}
