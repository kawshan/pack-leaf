package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

//generic eka vidihata apita ona ekak danna puluwan
public interface PaymentVoucherReportDao extends JpaRepository<Company,Integer> {


    @Query(value = "select distinct paymentvoucherheader.payment_voucher_date, paymentvoucherheader.payment_voucher_number, (select supplier.suppliername from packleaf.supplier where id = paymentvoucherheader.supplier_id) as supplier_name, (select sum(amount) from paymentvoucherdetails where pv_header_key=paymentvoucherheader.payment_voucher_header_key) as total_amount from paymentvoucherheader inner join paymentvoucherdetails on paymentvoucherheader.payment_voucher_header_key = paymentvoucherdetails.pv_header_key and payment_voucher_date between ?1 and ?2 order by payment_voucher_date asc;",nativeQuery = true)
    public List<Object> getPaymentVouchers(String fromdate, String todate);



}
