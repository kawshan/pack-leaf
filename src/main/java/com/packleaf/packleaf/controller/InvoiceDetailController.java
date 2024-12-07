package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.InvoiceDetailDao;
import com.packleaf.packleaf.entity.InvoiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/invoice-detail")
public class InvoiceDetailController {

    @Autowired
    private InvoiceDetailDao invoiceDetailDao;


    @GetMapping
    public ModelAndView invoiceView(){
        ModelAndView invoiceUI = new ModelAndView();
        invoiceUI.setViewName("invoice.html");
        return invoiceUI;
    }

    @GetMapping(value = "/findall")
    public List<InvoiceDetail> getAllInvoiceDetail() {
        return invoiceDetailDao.findAll();
    }

    @PostMapping
    public String saveInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail) {
        try {
            invoiceDetailDao.save(invoiceDetail);
            return "ok";
        }catch (Exception e){
            return "save invoice detail failed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail) {
        try {
            invoiceDetailDao.save(invoiceDetail);
            return "ok";
        }catch (Exception e){
            return "update invoice detail failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail) {
        try {
            invoiceDetailDao.delete(invoiceDetail);
            return "ok";
        }catch (Exception e){
            return "delete invoice detail failed"+e.getMessage();
        }
    }




    @GetMapping(value = "/getmaxinkey")
    public String getMaxInKey() {
        return invoiceDetailDao.getMaxInKey();
    }


    @GetMapping(value = "/getallinvoicedetailbyinvoicekey/{invoicekey}")
    public List<InvoiceDetail> getAllInvoiceDetailByInvoiceKey(@PathVariable String invoicekey) {
        return invoiceDetailDao.getAllInvoiceDetailByInvoiceKey(invoicekey);
    }


    @GetMapping(value = "/gettotalvaluefrominoicekey/{invoicekey}")
    public String getTotalValueFromInvoiceKey(@PathVariable("invoicekey") String invoicekey) {
        return invoiceDetailDao.getTotalValueByInvoiceKey(invoicekey);
    }




}
