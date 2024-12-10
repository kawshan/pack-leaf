package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.PurchaseOrderHeaderDao;
import com.packleaf.packleaf.entity.PurchaseOrderHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/purchaseorderheader")
public class PurchaseOrderHeaderController {

    @Autowired
    private PurchaseOrderHeaderDao purchaseOrderHeaderDao;


    @GetMapping(value = "/findall")
    public List<PurchaseOrderHeader> getAllPurchaseOrderHeader() {
        return purchaseOrderHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView purchaseOrderView(){
        ModelAndView invoiceUI = new ModelAndView();
        invoiceUI.setViewName("purchaseorder.html");
        return invoiceUI;
    }


    @PostMapping
    public ResponseEntity<PurchaseOrderHeader> savePurchaseOrderHeader(@RequestBody PurchaseOrderHeader purchaseOrderHeader){
        try {
            String purchaseOrderHeaderMax = purchaseOrderHeaderDao.getMaxPurchaseOrderHeaderKey();
            if (purchaseOrderHeaderMax == null || purchaseOrderHeaderMax.equals("")){
                purchaseOrderHeader.setPokey("PO0001");
            }else {
                purchaseOrderHeader.setPokey(purchaseOrderHeaderMax);
            }
            PurchaseOrderHeader savedPurchaseOrderHeader =  purchaseOrderHeaderDao.save(purchaseOrderHeader);
            return ResponseEntity.ok(savedPurchaseOrderHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updatePurchaseOrderHeader(@RequestBody PurchaseOrderHeader purchaseOrderHeader){
        try {
            purchaseOrderHeaderDao.save(purchaseOrderHeader);
            return "ok";
        }catch (Exception e){
            return "update not complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deletePurchaseOrderHeader(@RequestBody PurchaseOrderHeader purchaseOrderHeader){
        try {
            purchaseOrderHeaderDao.deletePoDetailsFromPoKey(purchaseOrderHeader.getPokey());
            purchaseOrderHeaderDao.delete(purchaseOrderHeader);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }



    @GetMapping(value = "/getidfrompurchaseorderheadekey/{pokey}")
    public String getIdFromPurchaseOrderHeaderKey(@PathVariable("pokey") String pokey ){
        return purchaseOrderHeaderDao.getIdFromPokey(pokey);
    }


    @GetMapping(value = "/getpokeyfromponumber/{ponumber}")
    public String getPoKeyFromPurchaseOrderHeaderKey(@PathVariable("ponumber") String ponumber ){
        return purchaseOrderHeaderDao.getPoKeyFromPoNumber(ponumber);
    }



}