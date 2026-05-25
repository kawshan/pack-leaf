package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.GrnDetails;
import com.packleaf.packleaf.entity.OurPoDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GrnDetailsDao extends JpaRepository<GrnDetails,Integer> {


    @Query(value = "select gd from GrnDetails gd where gd.grnheader=?1 order by gd.id desc")
    public List<GrnDetails> findByGrnHeader(String grnHeader);


    @Query(value = "select (select sum(ourpodetail.qty) as total_po_quantity from ourpodetail where id=?1) - (select sum(grndetails.quantity) as total_grn_ed_quantity from grndetails where ourpodetail_id=?1) as final_remaining_quantity;",nativeQuery = true)
    public String getRemainingGrnDetailQuantity(String id);


    @Query(value = "select exists(select * from grndetails where ourpodetail_id=?1)",nativeQuery = true)
    public String getGrnDetailsByOurPoId(Integer ourpoid);


//    meka payment voucher ekata one vena query ekak remaining balala ehema ganna result ekak thama meke enne
//    grn header eka click karahama eke thiyena header key eken payment karapu ewage remaining eke penawa meke vena de balaganna puluwan
//    payment voucher ekata gihin load grn click karahama ee ena model eke ekak click karahama iilagata load vena table eke resulting query eka thama meka..
//    @Query(value = "select distinct grndetails.id as some_id, grndetails.grnheader as grn_code, grnheader.grnno as grn_number, (select sum(grndetails.quantity) from grndetails where grndetails.id = some_id) - (select sum(paymentvoucherdetails.quantity) from paymentvoucherdetails where paymentvoucherdetails.grndetails_id=some_id) as Remaining_quantity, grndetails.rate from paymentvoucherdetails inner join grndetails on paymentvoucherdetails.grndetails_id = grndetails.id inner join grnheader on grndetails.grnheader = grnheader.grnheaderkey and grndetails.grnheader=?1",nativeQuery = true)
    //uda query eka hari giye na
    //me aluth query eka liyala balamu kohomada kiyala
//    @Query(value = "SELECT DISTINCT grndetails.id AS grn_details_id, grndetails.quantity, grndetails.rate, grndetails.grnheader, (SELECT SUM(grndetails.quantity) FROM grndetails WHERE grndetails.id=grn_details_id) - (SELECT SUM(paymentvoucherdetails.quantity) FROM paymentvoucherdetails WHERE paymentvoucherdetails.grndetails_id=grn_details_id) AS remaining_quantity FROM grndetails WHERE id IN (SELECT grndetails_id FROM paymentvoucherdetails) AND grnheader=?1 UNION ALL SELECT DISTINCT grndetails.id AS grn_details_id, grndetails.quantity, grndetails.rate, grndetails.grnheader, (SELECT SUM(grndetails.quantity) FROM grndetails WHERE grndetails.id=grn_details_id) AS remaining_quantity FROM grndetails WHERE id NOT IN (SELECT grndetails_id FROM paymentvoucherdetails) AND grnheader=?1",nativeQuery = true)



//uda query eke thibbe na grn number eka item code eka description eka wage dewal ee tika add kara

//    @Query(value = "select distinct\n" +
//            "grndetails.id as grn_details_id, grndetails.quantity, grndetails.rate, grndetails.grnheader as grn_code,\n" +
//            "(select sum(grndetails.quantity) from grndetails where grndetails.id=grn_details_id) - (select sum(paymentvoucherdetails.quantity) from paymentvoucherdetails where paymentvoucherdetails.grndetails_id=grn_details_id)\n" +
//            "as remaining_quantity,\n" +
//            "grndetails.itemcode, grndetails.gd_description,\n" +
//            "(select grnheader.grnno from grnheader where grnheaderkey=grn_code) as grn_number\n" +
//            "from grndetails where id  in (select grndetails_id from paymentvoucherdetails) and grnheader=?1 \n" +
//            "union all\n" +
//            "select distinct\n" +
//            "grndetails.id as grn_details_id, grndetails.quantity, grndetails.rate, grndetails.grnheader as grn_code,\n" +
//            "(select sum(grndetails.quantity) from grndetails where grndetails.id=grn_details_id)\n" +
//            "as remaining_quantity,\n" +
//            "grndetails.itemcode, grndetails.gd_description,\n" +
//            "(select grnheader.grnno from grnheader where grnheaderkey=grn_code) as grn_number\n" +
//            "from grndetails where id not in (select grndetails_id from paymentvoucherdetails) and grnheader=?1",nativeQuery = true)


//    query එක මාරු කරා මොකද company එකේ තියෙන db එකේදී මේ query එක වැඩ කරේ නෑ මේක testing
    @Query(value = "select\n" +
            "grndetails.id as grn_details_id, grndetails.quantity, grndetails.rate, grndetails.grnheader as grn_code,\n" +
            "(select sum(grndetails.quantity) from grndetails where grndetails.id=grn_details_id) - (select sum(paymentvoucherdetails.quantity) from paymentvoucherdetails where paymentvoucherdetails.grndetails_id=grn_details_id)\n" +
            "as remaining_quantity,\n" +
            "grndetails.itemcode, grndetails.gd_description,\n" +
            "(select grnheader.grnno from grnheader where grnheaderkey=grn_code) as grn_number\n" +
            "from grndetails where grnheader=?1",nativeQuery = true)
    public List<Object> getGrnDetailsForPaymentVoucher(String headerKey);



    @Query(value = "select gd from GrnDetails gd where gd.id=?1")
    public GrnDetails getGrnDetailsFromId(Integer id);


    @Query(value = "select sum(rate*quantity) from grndetails where grnheader = ?1 ",nativeQuery = true)
    public String getTotalGrnValuesFromHeaderKey(String headerKey);




}
