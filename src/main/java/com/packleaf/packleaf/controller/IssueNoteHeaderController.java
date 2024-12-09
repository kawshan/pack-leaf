package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.IssueNoteHeaderDao;
import com.packleaf.packleaf.entity.IssueNoteHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/issuenoteheader")
public class IssueNoteHeaderController {

    @Autowired
    private IssueNoteHeaderDao issueNoteHeaderDao;

    @GetMapping
    public ModelAndView issueNoteHeaderView(){
        ModelAndView issueNoteUi = new ModelAndView();
        issueNoteUi.setViewName("issuenote.html");
        return issueNoteUi;
    }


    @GetMapping(value = "/findall")
    public List<IssueNoteHeader> getAllIssueNoteHeaders(){
        return issueNoteHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping
    public ResponseEntity<IssueNoteHeader> saveIssueNoteHeader(@RequestBody IssueNoteHeader issueNoteHeader){
        try {
                String maxHeaderKey = issueNoteHeaderDao.getMaxIssueNoteHeaderKey();
                if (maxHeaderKey==null || maxHeaderKey.equals("")){
                    issueNoteHeader.setHeaderkey("IN0001");
                }else {
                    issueNoteHeader.setHeaderkey(maxHeaderKey);
                }

            IssueNoteHeader savedIssueNoteHeader = issueNoteHeaderDao.save(issueNoteHeader);
            return ResponseEntity.ok(savedIssueNoteHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateIssueNoteHeader(@RequestBody IssueNoteHeader issueNoteHeader){
        try {
            issueNoteHeaderDao.save(issueNoteHeader);
            return "ok";
        }catch (Exception e){
            return "Update Issue Note Header Not Complete";
        }
    }


    @DeleteMapping
    public String deleteIssueNoteHeader(@RequestBody IssueNoteHeader issueNoteHeader){
        try {
            //first we need to delete all the issue note details
            issueNoteHeaderDao.deleteIssueNoteDetailByHeaderKey(issueNoteHeader.getHeaderkey());

            issueNoteHeaderDao.delete(issueNoteHeader);
            return "ok";
        }catch (Exception e){
            return "Delete Issue Note Header Not Complete";
        }
    }




    @GetMapping(value = "/getidfromheaderkey/{headerkey}")
    public String getIdFromIssueNoteHeader(@PathVariable("headerkey") String headerkey){
        return issueNoteHeaderDao.getIdFromHeaderKey(headerkey);
    }



}
