package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.StockAdjustmentDetailsDao;
import com.packleaf.packleaf.entity.StockAdjustmentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.PanelUI;
import java.util.List;

@RestController
@RequestMapping(value = "/stockadjustmentdetails")
public class StockAdjustmentDetailsController {

    @Autowired
    private StockAdjustmentDetailsDao stockAdjustmentDetailsDao;

    @GetMapping(value = "/findall")
    public List<StockAdjustmentDetails> findAllStockAdjustmentDetails() {
        return stockAdjustmentDetailsDao.findAll();
    }


    @PostMapping
    public String saveStockAdjustmentDetails(@RequestBody StockAdjustmentDetails stockAdjustmentDetails) {
        try {
            stockAdjustmentDetailsDao.save(stockAdjustmentDetails);
            return "ok";
        }catch (Exception e) {
            return "save StockAdjustmentDetails failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateStockAdjustmentDetails(@RequestBody StockAdjustmentDetails stockAdjustmentDetails){
        try {
            stockAdjustmentDetailsDao.save(stockAdjustmentDetails);
            return "ok";
        }catch (Exception e) {
            return "update Stock Adjustment Details Failed"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteStockAdjustmentDetails(@RequestBody StockAdjustmentDetails stockAdjustmentDetails){
        try {
            stockAdjustmentDetailsDao.delete(stockAdjustmentDetails);
            return "ok";
        }catch (Exception e){
            return "delete Stock Adjustment Details Failed"+e.getMessage();
        }
    }




    @GetMapping(value = "/getstockadjustmentdetailsfromheaderkey/{headerKey}")
    public List<StockAdjustmentDetails> getStockAdjustmentDetailsFromHeaderKeyZX(@PathVariable String headerKey){
        return stockAdjustmentDetailsDao.getStockAdjustmentDetailsByHeaderKey(headerKey);
    }



}
