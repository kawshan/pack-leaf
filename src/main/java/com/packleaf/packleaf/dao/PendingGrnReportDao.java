package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PendingGrnReportDao extends JpaRepository<Customer,Integer> {


    @Query(value = "select s.suppliername, c.companyname, gh.grnno, pv.payment_grn_numbers,\n" +
            "sum(coalesce(gd.quantity * gd.rate,0)) as total_grn_value,\n" +
            "coalesce(sum(pv.total_payed_value),0) as final_total_payed,\n" +
            "(sum(coalesce(gd.quantity * gd.rate,0)) - coalesce(sum(pv.total_payed_value),0)) as remaining\n" +
            "from grndetails gd\n" +
            "join grnheader gh on gh.grnheaderkey = gd.grnheader\n" +
            "join rawmaterial rm on gd.rawmaterial_id = rm.id\n" +
            "join supplier s on gh.supplier_id = s.id\n" +
            "join company c on gh.company_id = c.id\n" +
            "left join (\n" +
            "select\n" +
            "ph.payment_grn_numbers, sum(coalesce(pd.quantity * pd.rate,0)) as total_payed_value\n" +
            "from paymentvoucherheader ph join paymentvoucherdetails pd on ph.payment_voucher_header_key = pd.pv_header_key\n" +
            "group by ph.payment_grn_numbers\n" +
            ")\n" +
            "pv on gh.grnno = pv.payment_grn_numbers\n" +
            "group by s.suppliername, c.companyname, gh.grnno;",nativeQuery = true)
    public List<Object[]> getPendingPoReport();








}
