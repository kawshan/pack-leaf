package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.IssueCheque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IssueChequeDao extends JpaRepository<IssueCheque,Integer> {


    @Query(value = "select concat('IC',lpad(max(substring(issuecheque.issue_cheque_code,3))+1,4,'0')) as max_cheque_code from issuecheque;",nativeQuery = true)
    public String getMaxChequeCode();





}
