package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PendingGrnReportDao extends JpaRepository<Customer,Integer> {


    @Query(value = "SELECT s.suppliername, c.companyname, gh.grnno, pv.payment_grn_numbers, SUM(COALESCE(gd.quantity * gd.rate, 0)) AS total_grn_value, COALESCE(MAX(pv.total_payed_value), 0) AS final_total_payed, (SUM(COALESCE(gd.quantity * gd.rate, 0)) - COALESCE(MAX(pv.total_payed_value), 0)) AS remaining, gh.grndate, gh.supplier_invoice_number FROM grndetails gd JOIN grnheader gh ON gh.grnheaderkey = gd.grnheader JOIN rawmaterial rm ON gd.rawmaterial_id = rm.id JOIN supplier s ON gh.supplier_id = s.id JOIN company c ON gh.company_id = c.id LEFT JOIN (SELECT ph.payment_grn_numbers, SUM(COALESCE(pd.quantity * pd.rate, 0)) AS total_payed_value FROM paymentvoucherheader ph JOIN paymentvoucherdetails pd ON ph.payment_voucher_header_key = pd.pv_header_key GROUP BY ph.payment_grn_numbers) pv ON gh.grnno = pv.payment_grn_numbers WHERE gh.payment_type = 'credit' GROUP BY s.suppliername, c.companyname, gh.grnno, gh.grndate, gh.supplier_invoice_number, pv.payment_grn_numbers HAVING (SUM(COALESCE(gd.quantity * gd.rate, 0)) - COALESCE(MAX(pv.total_payed_value), 0)) <> 0;" ,nativeQuery = true)
    public List<Object[]> getPendingGRNReport();


    @Query(value = "SELECT s.suppliername, c.companyname, gh.grnno, pv.payment_grn_numbers, SUM(COALESCE(gd.quantity * gd.rate, 0)) AS total_grn_value, COALESCE(MAX(pv.total_payed_value), 0) AS final_total_payed, (SUM(COALESCE(gd.quantity * gd.rate, 0)) - COALESCE(MAX(pv.total_payed_value), 0)) AS remaining, gh.grndate, gh.supplier_invoice_number FROM grndetails gd JOIN grnheader gh ON gh.grnheaderkey = gd.grnheader JOIN rawmaterial rm ON gd.rawmaterial_id = rm.id JOIN supplier s ON gh.supplier_id = s.id JOIN company c ON gh.company_id = c.id LEFT JOIN (SELECT ph.payment_grn_numbers, SUM(COALESCE(pd.quantity * pd.rate, 0)) AS total_payed_value FROM paymentvoucherheader ph JOIN paymentvoucherdetails pd ON ph.payment_voucher_header_key = pd.pv_header_key GROUP BY ph.payment_grn_numbers) pv ON gh.grnno = pv.payment_grn_numbers WHERE gh.payment_type = 'cash' GROUP BY s.suppliername, c.companyname, gh.grnno, gh.grndate, gh.supplier_invoice_number, pv.payment_grn_numbers HAVING (SUM(COALESCE(gd.quantity * gd.rate, 0)) - COALESCE(MAX(pv.total_payed_value), 0)) <> 0;" ,nativeQuery = true)
    public List<Object[]> getPendingGRNReportForCash();





}
