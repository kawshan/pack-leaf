package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.GrnHeader;
import com.packleaf.packleaf.entity.PaymentVoucherDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentVoucherDetailsDao extends JpaRepository<PaymentVoucherDetails,Integer> {



    @Query(value = "select pvd from PaymentVoucherDetails pvd where pvd.pv_header_key=?1")
    public List<PaymentVoucherDetails> getPaymentVoucherDetailsByHeaderKey(String headerkey);


    @Query(value = "select sum(amount) from paymentvoucherdetails where pv_header_key=?1",nativeQuery = true)
    public String getAmountByHeaderKey(String headerkey);

//                  select * from grnheader where grnheaderkey not in (select paymentvoucherdetails.grn_key from paymentvoucherdetails where grn_key is not null);
    @Query(value = "select gh from GrnHeader gh where gh.grnheaderkey not in (select pvd.grn_key from PaymentVoucherDetails pvd where pvd.grn_key is not null )")
    public List<GrnHeader> getPendingGrnHeaders();

}
