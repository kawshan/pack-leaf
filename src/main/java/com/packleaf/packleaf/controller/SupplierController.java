package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.SupplierDao;
import com.packleaf.packleaf.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/supplier")
public class SupplierController {

    @Autowired
    private SupplierDao supplierDao;

    @GetMapping
    public ModelAndView supplierView(){
        ModelAndView supplierUI = new ModelAndView();
        supplierUI.setViewName("supplier.html");
        return supplierUI;
    }

    @GetMapping(value = "/findall")
    public List<Supplier> getAllSupplier(){
        return supplierDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping
    public String saveSupplier(@RequestBody Supplier supplier){
        try {
            String getSupplierMaxKey = supplierDao.getSupplierMaxKey();
            if (getSupplierMaxKey==null || getSupplierMaxKey.equals("")){
                supplier.setSupplierkey("SUP0001");
            }else {
                supplier.setSupplierkey(getSupplierMaxKey);
            }

            supplierDao.save(supplier);
            return "ok";
        }catch (Exception e){
            return "Supplier Save Not Complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateSupplier(@RequestBody Supplier supplier){
        try {
            supplierDao.save(supplier);
            return "ok";
        }catch (Exception e){
            return "Supplier Update Not Complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteSupplier(@RequestBody Supplier supplier){
        try {
            supplier.setSupplierstatus(false);
            supplierDao.save(supplier);
            return "ok";
        }catch (Exception e){
            return "supplier Delete Not Complete"+e.getMessage();
        }
    }



}
