package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PendingPoReportDao extends JpaRepository<Customer,Integer> {


    @Query(value = "select\n" +
            "    poh.pokey,\n" +
            "    pod.item_id,\n" +
            "    i.itmname,\n" +
            "    pod.poqty as poQuantity,\n" +
            "    coalesce(inv.invoiceQuantity, 0) as invoiceQuantity,\n" +
            "    pod.poqty - coalesce(inv.invoiceQuantity, 0) as remainingQuantity,\n" +
            "    pod.porate\n" +
            "from podetail pod\n" +
            "join poheader poh on poh.pokey = pod.purchaseorderkey\n" +
            "join item i on pod.item_id = i.id\n" +
            "left join (\n" +
            "    select\n" +
            "        ind.item_id,\n" +
            "        inh.ponumber,\n" +
            "        sum(ind.invqty) as invoiceQuantity\n" +
            "    from invoicedetail ind\n" +
            "    join invoiceheader inh on ind.invoicekey = inh.inkey\n" +
            "    group by ind.item_id, inh.ponumber\n" +
            ") inv on inv.item_id = pod.item_id and inv.ponumber = poh.ponumber\n" +
            "where pod.poqty - coalesce(inv.invoiceQuantity, 0) > 0;",nativeQuery = true)
    public List<Object[]> getPendingPoReport();








}
