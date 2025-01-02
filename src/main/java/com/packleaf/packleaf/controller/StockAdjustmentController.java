package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.StockAdjustmentHeaderDao;
import com.packleaf.packleaf.entity.StockAdjustmentHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "stockadjustmentheader")
public class StockAdjustmentController {

    @Autowired
    private StockAdjustmentHeaderDao stockAdjustmentHeaderDao;


    @GetMapping(value = "/findall")
    public List<StockAdjustmentHeader> findAllStockAdjustmentHeaders(){
        return stockAdjustmentHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @GetMapping
    public ModelAndView stockAdjustmentView(){
        ModelAndView stockAdjustmentView = new ModelAndView();
        stockAdjustmentView.setViewName("stockadjustment.html");
        return stockAdjustmentView;
    }


    @PostMapping
    public ResponseEntity<StockAdjustmentHeader> submitStockAdjustment(@RequestBody StockAdjustmentHeader stockAdjustmentHeader){
        try {
            String maxStockAdjustmentHeaderKey = stockAdjustmentHeaderDao.getMaxSockAdjustmentHeaderKey();
            if (maxStockAdjustmentHeaderKey==null || maxStockAdjustmentHeaderKey.equals("")){
                stockAdjustmentHeader.setAdjustment_key("ADJ0001");
            }else {
                stockAdjustmentHeader.setAdjustment_key(maxStockAdjustmentHeaderKey);
            }
            StockAdjustmentHeader savedStockAdjustmentHeader =  stockAdjustmentHeaderDao.save(stockAdjustmentHeader);
            return ResponseEntity.ok(savedStockAdjustmentHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateStockAdjustmentHeader(@RequestBody StockAdjustmentHeader stockAdjustmentHeader){
        try {
            stockAdjustmentHeaderDao.save(stockAdjustmentHeader);
            return "ok";
        }catch (Exception e){
            return "Update Stock Adjustment Header failed"+e.getMessage();
        }
    }



    @DeleteMapping
    public String deleteStockAdjustmentHeader(@RequestBody StockAdjustmentHeader stockAdjustmentHeader){
        try {
            stockAdjustmentHeaderDao.deleteByHeaderKey(stockAdjustmentHeader.getAdjustment_key());
            stockAdjustmentHeaderDao.delete(stockAdjustmentHeader);
            return "ok";
        }catch (Exception e){
            return "Delete Stock Adjustment Header failed"+e.getMessage();
        }
    }








    @GetMapping(value = "/getidfromheaderkey/{headerkey}")
    public Integer getIdFromHeaderKey (@PathVariable("headerkey")String headerkey){
        return stockAdjustmentHeaderDao.getIdByAdjustmentKey(headerkey);
    }





}
