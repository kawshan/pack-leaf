package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.IssueNoteDetailDao;
import com.packleaf.packleaf.entity.IssueNoteDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/issuenotedetail")
public class IssueNoteDetailController {

    @Autowired
    private IssueNoteDetailDao issueNoteDetailDao;

    @GetMapping(value = "/findall")
    public List<IssueNoteDetail>findAllIssueNoteDetail(){
        return issueNoteDetailDao.findAll();
    }

    @PostMapping
    public String saveIssueNoteDetail(@RequestBody IssueNoteDetail issueNoteDetail){
        try {
            issueNoteDetailDao.save(issueNoteDetail);
            return "ok";
        }catch (Exception e){
            return "Issue Note Detail Not Complete"+e.getMessage();
        }
    }


    @PutMapping
    public String updateIssueNoteDetail(@RequestBody IssueNoteDetail issueNoteDetail){
        try {
            issueNoteDetailDao.save(issueNoteDetail);
            return "ok";
        }catch (Exception e){
            return "Issue Note Detail Not Complete"+e.getMessage();
        }
    }



    @DeleteMapping
    public String deleteIssueNoteDetail(@RequestBody IssueNoteDetail issueNoteDetail){
        try {
            issueNoteDetailDao.delete(issueNoteDetail);
            return "ok";
        }catch (Exception e){
            return "Issue Note Detail Not Complete"+e.getMessage();
        }
    }



    @GetMapping(value = "/getallissuenotefromheaderkey/{headerKey}")
    public List<IssueNoteDetail> findAllIssueNoteDetailByHeaderKey(@PathVariable("headerKey") String headerKey){
        return issueNoteDetailDao.getAllIssueNoteDetailByIssueNoteHeader(headerKey);
    }



}
