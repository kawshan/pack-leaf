package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.JobMasterDao;
import com.packleaf.packleaf.dao.JobMasterStatusDao;
import com.packleaf.packleaf.entity.JobMaster;
import com.packleaf.packleaf.entity.JobMasterHasItem;
import com.packleaf.packleaf.entity.JobMasterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/jobmaster")
public class JobMasterController {

    @Autowired
    private JobMasterDao jobDao;

    @Autowired
    private JobMasterStatusDao jobMasterStatusDao;


    @GetMapping
    public ModelAndView jobView(){
        ModelAndView jobUi = new ModelAndView();
        jobUi.setViewName("jobmaster.html");
        return jobUi;
    }

    @GetMapping(value = "/findall")
    public List<JobMaster> getAllJobs(){
        return jobDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping
    public String saveJobMaster(@RequestBody JobMaster jobMaster){
        try {
            String maxJobMasterKey =jobDao.getMaxJobKey();
            if (maxJobMasterKey==null || maxJobMasterKey.equals("")){
                jobMaster.setJobmasterkey("JOB0001");
            }else {
                jobMaster.setJobmasterkey(maxJobMasterKey);
            }

            for (JobMasterHasItem jobMasterHasItem : jobMaster.getJobMasterHasItems()) {
                jobMasterHasItem.setJobmaster_id(jobMaster);
            }

            jobDao.save(jobMaster);
            return "ok";
        }catch (Exception e){
            return "save Job Master Not Completed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateJobMaster(@RequestBody JobMaster jobMaster){
        try {


            for (JobMasterHasItem jobMasterHasItem : jobMaster.getJobMasterHasItems()) {
                jobMasterHasItem.setJobmaster_id(jobMaster);
            }


            jobDao.save(jobMaster);
            return "ok";
        }catch (Exception e){
            return "update Job Master Not Completed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteJobMaster(@RequestBody JobMaster jobMaster){
        try {
            JobMasterStatus deleteStatus = jobMasterStatusDao.getReferenceById(3);
            jobMaster.setJobmasterstatus_id(deleteStatus);


            for (JobMasterHasItem jobMasterHasItem : jobMaster.getJobMasterHasItems()) {
                jobMasterHasItem.setJobmaster_id(jobMaster);
            }

            jobDao.save(jobMaster);
            return "ok";
        }catch (Exception e){
            return "delete Job Master Not Completed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getmaxjobnumber")
    public String getMaxJobNumber(){
        String maxJobNumber =  jobDao.getMaxJobNumber();
        if (maxJobNumber==null || maxJobNumber.equals("")){
            return "1001";
        }else {
            return maxJobNumber;
        }
    }



}
