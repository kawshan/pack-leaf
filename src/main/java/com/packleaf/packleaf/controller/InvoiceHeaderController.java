package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.InvoiceHeaderDao;
import com.packleaf.packleaf.entity.InvoiceHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/invoice-header")
public class InvoiceHeaderController {

    @Autowired
    private InvoiceHeaderDao invoiceHeaderDao;


    @GetMapping(value = "/findall")
    public List<InvoiceHeader> getAllInvoiceHeader(){
        return invoiceHeaderDao.findAll();
    }

    @PostMapping()
    public String saveInvoiceHeader(@RequestBody InvoiceHeader invoiceHeader){
        try {
            String invoiceHeaderMax = invoiceHeaderDao.getInvoiceHeaderMaxInvoiceKey();
            if (invoiceHeaderMax == null || invoiceHeaderMax.equals("")) {
                invoiceHeader.setInkey("IN0001");
            }else {
                invoiceHeader.setInkey(invoiceHeaderMax);
            }
            invoiceHeaderDao.save(invoiceHeader);
            return "ok";
        }catch (Exception e){
            return "save not complete"+e.getMessage();
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




}
