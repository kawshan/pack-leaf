package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerDao extends JpaRepository<Customer,Integer> {

    @Query(value = "SELECT CONCAT('CM', LPAD(MAX(SUBSTRING(c.customerkey, 3)) + 1, 4, '0')) AS customerkey FROM packleaf.customer AS c;",nativeQuery = true)
    public String getCustomerNextKey();


}
