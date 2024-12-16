package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.PaymentVoucherReportDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/paymentvoucherreport")
public class PaymentVoucherReportController {

    @Autowired
    private PaymentVoucherReportDao paymentVoucherReportDao;

    @GetMapping
    public ModelAndView PaymentVoucherReportView(){
        ModelAndView paymentVoucherReportUI = new ModelAndView();
        paymentVoucherReportUI.setViewName("paymentvoucherreport.html");
        return paymentVoucherReportUI;
    }


    @GetMapping(value = "/getpaymentvoucherslist/{fromdate}/{todate}")
    public List<Object> getPaymentVouchersList(@PathVariable("fromdate") String fromdate, @PathVariable("todate")String todate){
        return paymentVoucherReportDao.getPaymentVouchers(fromdate,todate);
    }



}
