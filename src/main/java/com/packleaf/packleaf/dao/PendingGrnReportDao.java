package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PendingGrnReportDao extends JpaRepository<Customer,Integer> {


    @Query(value = "SELECT\n" +
            "    s.suppliername,\n" +
            "    c.companyname,\n" +
            "    gh.grnno,\n" +
            "    pv.payment_grn_numbers,\n" +
            "    SUM(COALESCE(gd.quantity * gd.rate, 0)) AS total_grn_value,\n" +
            "    COALESCE(SUM(pv.total_payed_value), 0) AS final_total_payed,\n" +
            "    (\n" +
            "        SUM(COALESCE(gd.quantity * gd.rate, 0))\n" +
            "        - COALESCE(SUM(pv.total_payed_value), 0)\n" +
            "    ) AS remaining,\n" +
            "    gh.grndate,\n" +
            "    gh.supplier_invoice_number\n" +
            "FROM grndetails gd\n" +
            "JOIN grnheader gh\n" +
            "    ON gh.grnheaderkey = gd.grnheader\n" +
            "JOIN rawmaterial rm\n" +
            "    ON gd.rawmaterial_id = rm.id\n" +
            "JOIN supplier s\n" +
            "    ON gh.supplier_id = s.id\n" +
            "JOIN company c\n" +
            "    ON gh.company_id = c.id\n" +
            "LEFT JOIN (\n" +
            "    SELECT\n" +
            "        ph.payment_grn_numbers,\n" +
            "        SUM(COALESCE(pd.quantity * pd.rate, 0)) AS total_payed_value\n" +
            "    FROM paymentvoucherheader ph\n" +
            "    JOIN paymentvoucherdetails pd\n" +
            "        ON ph.payment_voucher_header_key = pd.pv_header_key\n" +
            "    GROUP BY ph.payment_grn_numbers\n" +
            ") pv\n" +
            "    ON gh.grnno = pv.payment_grn_numbers\n" +
            "GROUP BY\n" +
            "    s.suppliername,\n" +
            "    c.companyname,\n" +
            "    gh.grnno,\n" +
            "    gh.grndate,\n" +
            "    gh.supplier_invoice_number;",nativeQuery = true)
    public List<Object[]> getPendingPoReport();








}
