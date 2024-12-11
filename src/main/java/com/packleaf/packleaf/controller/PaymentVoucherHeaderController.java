package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.PaymentVoucherHeaderDao;
import com.packleaf.packleaf.entity.PaymentVoucherHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/paymentvoucherheader")
public class PaymentVoucherHeaderController {

    @Autowired
    private PaymentVoucherHeaderDao paymentVoucherHeaderDao;

    @GetMapping(value = "/findall")
    public List<PaymentVoucherHeader> getAllPaymentVoucherHeader(){
        return paymentVoucherHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @GetMapping
    public ModelAndView PaymentVoucherView(){
        ModelAndView paymentVoucherUI = new ModelAndView();
        paymentVoucherUI.setViewName("paymentvoucher.html");
        return paymentVoucherUI;
    }


    @PostMapping
    public ResponseEntity<PaymentVoucherHeader> savePaymentVoucherHeader(@RequestBody PaymentVoucherHeader paymentVoucherHeader){
        try {
            String getMaxHeaderKey = paymentVoucherHeaderDao.getMaxPaymentHeaderKey();
            if (getMaxHeaderKey==null || getMaxHeaderKey.equals("")){
                paymentVoucherHeader.setPayment_voucher_header_key("PAY0001");
            }else {
                paymentVoucherHeader.setPayment_voucher_header_key(getMaxHeaderKey);
            }
            PaymentVoucherHeader savedPaymentVoucherHeader = paymentVoucherHeaderDao.save(paymentVoucherHeader);
            return ResponseEntity.ok(savedPaymentVoucherHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PutMapping
    public String updatePaymentVoucherHeader(@RequestBody PaymentVoucherHeader paymentVoucherHeader){
        try {
            paymentVoucherHeaderDao.save(paymentVoucherHeader);
            return "ok";
        }catch (Exception e){
            return "update payment voucher header not successful"+e.getMessage();
        }
    }





    @DeleteMapping
    public String deletePaymentVoucherHeader(@RequestBody PaymentVoucherHeader paymentVoucherHeader){
        try {
            paymentVoucherHeaderDao.deletePaymentVoucherDetailsByHeaderKey(paymentVoucherHeader.getPayment_voucher_header_key());
            paymentVoucherHeaderDao.delete(paymentVoucherHeader);
            return "ok";
        }catch (Exception e){
            return "Delete Payment Voucher Header Not Success"+e.getMessage();
        }
    }




    @GetMapping(value = "/getidfromheaderKey/{headerkey}")
    public String getIdFromHeaderKey(@PathVariable("headerkey") String headerkey){
        return paymentVoucherHeaderDao.getIdFromPaymentVoucherHeaderKey(headerkey);
    }





}
