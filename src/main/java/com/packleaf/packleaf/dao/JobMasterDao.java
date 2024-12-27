package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.JobMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JobMasterDao extends JpaRepository<JobMaster,Integer> {


    @Query(value = "select concat('JOB',lpad(max(substring(jobmaster.jobmasterkey,4))+1,4,'0')) as max_job_key from jobmaster;",nativeQuery = true)
    public String getMaxJobKey();

    @Query(value = "select max(jobmaster.jobnumber+1) from jobmaster",nativeQuery = true)
    public String getMaxJobNumber();


}
