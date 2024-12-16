package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.PaymentVoucherDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentVoucherDetailsDao extends JpaRepository<PaymentVoucherDetails,Integer> {



    @Query(value = "select pvd from PaymentVoucherDetails pvd where pvd.pv_header_key=?1")
    public List<PaymentVoucherDetails> getPaymentVoucherDetailsByHeaderKey(String headerkey);


    @Query(value = "select sum(amount) from paymentvoucherdetails where pv_header_key=?1",nativeQuery = true)
    public String getAmountByHeaderKey(String headerkey);

}
