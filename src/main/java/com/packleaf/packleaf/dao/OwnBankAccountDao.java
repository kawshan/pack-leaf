package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.OwnBankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OwnBankAccountDao extends JpaRepository<OwnBankAccount,Integer> {


    @Query(value = "select concat('ACC',lpad(max(substring(ownbankaccount.bank_key,4))+1,4,'0')) as max_account_number from ownbankaccount;",nativeQuery = true)
    public String getMaxOwnBankAccountKey();


}
