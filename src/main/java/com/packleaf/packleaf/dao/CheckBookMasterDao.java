package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.CheckBookMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CheckBookMasterDao extends JpaRepository<CheckBookMaster,Integer> {


    @Query(value = "select concat('CB',lpad(max(substring(checkbookmaster.running_number,3))+1,4,'0')) as max_running_number from checkbookmaster;",nativeQuery = true)
    public String getMaxRunningNumber();


}
