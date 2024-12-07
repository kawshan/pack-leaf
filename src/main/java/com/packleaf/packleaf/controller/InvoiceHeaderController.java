package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.InvoiceHeaderDao;
import com.packleaf.packleaf.entity.InvoiceHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/invoice-header")
public class InvoiceHeaderController {

    @Autowired
    private InvoiceHeaderDao invoiceHeaderDao;


    @GetMapping(value = "/findall")
    public List<InvoiceHeader> getAllInvoiceHeader(){
        return invoiceHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping()
    public ResponseEntity<InvoiceHeader> saveInvoiceHeader(@RequestBody InvoiceHeader invoiceHeader){
        try {
            String invoiceHeaderMax = invoiceHeaderDao.getInvoiceHeaderMaxInvoiceKey();
            if (invoiceHeaderMax == null || invoiceHeaderMax.equals("")) {
                invoiceHeader.setInkey("IN0001");
            }else {
                invoiceHeader.setInkey(invoiceHeaderMax);
            }
            InvoiceHeader savedInvoiceHeader =  invoiceHeaderDao.save(invoiceHeader); //save and get the object back
            return ResponseEntity.ok(savedInvoiceHeader);   //return the saved object
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping
    public String updateInvoiceHeader(@RequestBody InvoiceHeader invoiceHeader){
        try {
            invoiceHeaderDao.save(invoiceHeader);
            return "ok";
        }catch (Exception e){
            return "update not complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteInvoiceHeader(@RequestBody InvoiceHeader invoiceHeader){
        try {
            invoiceHeaderDao.delete(invoiceHeader);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }

    @GetMapping(value = "/getinvoiceheaderbyinvoicenumber/{invno}")
    public InvoiceHeader getInvoiceHeaderByInvoiceNumber(@PathVariable("invno") String invno){
        return invoiceHeaderDao.getInvoiceHeaderByInvNo(invno);
    }


    @GetMapping(value = "/getmostrecentinvoiceheader")
    public List<InvoiceHeader> getMostRecentInvoiceHeader(){
        return invoiceHeaderDao.getMostRecentInvoiceHeader();
    }


    @GetMapping(value = "/getidfrominvoicekey/{invoicekey}")
    public Integer getIdFromInvoiceKey(@PathVariable("invoicekey") String invoicekey){
        return invoiceHeaderDao.getIdFromInvoiceKey(invoicekey);
    }




    @GetMapping(value = "/getinvoiceheaderbypokey/{pokey}")
    public Boolean getInvoiceHeaderByPoKey(@PathVariable("pokey") String pokey){
        InvoiceHeader invoiceHeaderExisting = invoiceHeaderDao.getInvoiceHeaderByPokey(pokey);
        if (invoiceHeaderExisting!=null){
            return true;
        }else {
            return false;
        }
    }




}
