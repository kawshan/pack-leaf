package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.PaymentVoucherHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PaymentVoucherHeaderDao extends JpaRepository<PaymentVoucherHeader,Integer> {



    @Query(value = "select concat('PAY',lpad(max(substring(paymentvoucherheader.payment_voucher_header_key,4))+1,4,'0')) as max_payment_header_key from paymentvoucherheader;",nativeQuery = true)
    public String getMaxPaymentHeaderKey();

    @Query(value = "select pvh.id from PaymentVoucherHeader pvh where pvh.payment_voucher_header_key=?1")
    public String getIdFromPaymentVoucherHeaderKey(String headerkey);


    @Transactional
    @Modifying
    @Query(value = "delete from paymentvoucherdetails where pv_header_key=?1;",nativeQuery = true)
    public void deletePaymentVoucherDetailsByHeaderKey(String headerkey);

    @Query(value = "select max(payment_voucher_number+1) from paymentvoucherheader;",nativeQuery = true)
    public String getMaxVoucherNumber();

    @Query(value = "select cheque_amount from issuecheque where cheque_number=?1",nativeQuery = true)
    public String getAmountFromChequeNumber(String chequeNumber);


}
