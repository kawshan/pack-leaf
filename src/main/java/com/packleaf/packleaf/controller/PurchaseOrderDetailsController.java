package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.PurchaseOrderDetailDao;
import com.packleaf.packleaf.entity.InvoiceDetail;
import com.packleaf.packleaf.entity.PurchaseOrderDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/purchaseorderdetails")
public class PurchaseOrderDetailsController {

    @Autowired
    private PurchaseOrderDetailDao purchaseOrderDetailDao;

    @GetMapping(value = "/findall")
    public List<PurchaseOrderDetails> getAllPurchaseOrderDetails() {
        return purchaseOrderDetailDao.findAll();
    }

    @PostMapping
    public String savePurchaseOrderDetails(@RequestBody PurchaseOrderDetails purchaseOrderDetails) {
        try {
            purchaseOrderDetailDao.save(purchaseOrderDetails);
            return "ok";
        }catch (Exception e) {
            return "save purchase order details failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updatePurchaseOrderDetails(@RequestBody PurchaseOrderDetails purchaseOrderDetails) {
        try {
            purchaseOrderDetailDao.save(purchaseOrderDetails);
            return "ok";
        }catch (Exception e) {
            return "update purchase order details failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deletePurchaseOrderDetails(@RequestBody PurchaseOrderDetails purchaseOrderDetails) {
        try {
            purchaseOrderDetailDao.delete(purchaseOrderDetails);
            return "ok";
        }catch (Exception e) {
            return "delete purchase order details failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getpurchaseorderdetailsbypurchaseorderkey/{purchaseOrderKey}")
    public List<PurchaseOrderDetails> getPurchaseOrderDetailByPurchaseOrderKey(@PathVariable("purchaseOrderKey") String purchaseOrderKey){
        return purchaseOrderDetailDao.getPurchaseOrderDetailsByPurchaseOrderKey(purchaseOrderKey);
    }


    //invoice header eke type karana po number eken po key eka aran.. eka ee po key eka po header eke thiyenawada balala ee po key ekata adala dewal tika gannawa po details table eken.
    @GetMapping(value = "/getpurchaseorderdetailsfromponumberininvoiceheader/{ponumber}")
    public List<PurchaseOrderDetails> getPurchaseOrderDetailsByPoKeyFromInvoiceHeader(@PathVariable("ponumber")String ponumber){
        return purchaseOrderDetailDao.getAvailablePurchaseOrderDetailsByPokeyInInvoiceHeader(ponumber);
    }


    @GetMapping(value = "/getpendingpurchaseorderdetails")
    public List<PurchaseOrderDetails> getPendingPurchaseOrderDetails() {
        return purchaseOrderDetailDao.getPendingPurchaseOrderDetails();
    }


}
