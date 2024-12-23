package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.PaymentVoucherDetailsDao;
import com.packleaf.packleaf.entity.GrnHeader;
import com.packleaf.packleaf.entity.PaymentVoucherDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/paymentvoucherdetails")
public class PaymentVoucherDetailsController {

    @Autowired
    private PaymentVoucherDetailsDao paymentVoucherDetailsDao;

    @GetMapping(value = "/findall")
    public List<PaymentVoucherDetails> findAllPaymentVoucherDetails(){
        return paymentVoucherDetailsDao.findAll();
    }


    @GetMapping(value = "/getpaymentvoucherdetailsbyheaderkey/{headerkey}")
    public List<PaymentVoucherDetails> getPaymentVoucherDetailsByHeaderKey(@PathVariable String headerkey){
        return paymentVoucherDetailsDao.getPaymentVoucherDetailsByHeaderKey(headerkey);
    }

    @PostMapping
    public String savePaymentVoucherDetails(@RequestBody PaymentVoucherDetails paymentVoucherDetails){
        try {
            paymentVoucherDetailsDao.save(paymentVoucherDetails);
            return "ok";
        }catch (Exception e){
            return "save payment voucher details failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updatePaymentVoucherDetails(@RequestBody PaymentVoucherDetails paymentVoucherDetails){
        try {
            paymentVoucherDetailsDao.save(paymentVoucherDetails);
            return "ok";
        }catch (Exception e){
            return "update payment voucher details failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deletePaymentVoucherDetails(@RequestBody PaymentVoucherDetails paymentVoucherDetails){
        try {
            paymentVoucherDetailsDao.delete(paymentVoucherDetails);
            return "ok";
        }catch (Exception e){
            return "delete payment voucher details failed"+e.getMessage();
        }
    }



    @GetMapping(value = "/gettotalvaluefromheaderkey/{headerkey}")
    public String getTotalValueFromHeaderKey(@PathVariable("headerkey") String headerkey){
        return paymentVoucherDetailsDao.getAmountByHeaderKey(headerkey);
    }


    @GetMapping(value = "/getpending-grn")
    public List<GrnHeader> getPendingGrnHeaders(){
        return paymentVoucherDetailsDao.getPendingGrnHeaders();
    }







}
