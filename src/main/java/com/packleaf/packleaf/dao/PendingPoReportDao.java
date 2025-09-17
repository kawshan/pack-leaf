package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PendingPoReportDao extends JpaRepository<Customer,Integer> {


    @Query(value = "select inh.inkey, inh.invno, inh.invdate, poh.pokey, pod.item_id, i.itmname,\n" +
            "coalesce(sum(ind.invqty),0) as invoiceQuantity, pod.poqty as poQuantity,\n" +
            "pod.poqty - coalesce(sum(ind.invqty),0) as remainingQuantity, pod.porate\n" +
            "from poheader as poh\n" +
            "join podetail as pod on poh.pokey = pod.purchaseorderkey\n" +
            "join item as i on pod.item_id = i.id\n" +
            "left JOIN invoiceheader inh on inh.ponumber = poh.ponumber\n" +
            "left join invoicedetail ind on ind.invoicekey = inh.inkey and ind.item_id = pod.item_id\n" +
            "group by inh.inkey, inh.invno, inh.invdate, poh.pokey, pod.item_id, pod.poqty, i.itmname, pod.porate\n" +
            "having (pod.poqty - coalesce(sum(ind.invqty),0)) > 0;",nativeQuery = true)
    public List<Object[]> getPendingPoReport();








}
