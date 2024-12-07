package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.RawMaterialDao;
import com.packleaf.packleaf.entity.RawMaterial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/rawmaterial")
public class RawMaterialController {

    @Autowired
    private RawMaterialDao rawMaterialDao;

    @GetMapping
    public ModelAndView rawMaterialView(){
        ModelAndView materialUI = new ModelAndView();
        materialUI.setViewName("rawmaterial.html");
        return materialUI;
    }


    @GetMapping(value = "/findall")
    public List<RawMaterial> findallRawMaterial(){
        return rawMaterialDao.findAll();
    }

    @PostMapping
    public String saveRawMaterial(@RequestBody RawMaterial rawMaterial){
        try {
            rawMaterialDao.save(rawMaterial);
            return "ok";
        }catch (Exception e){
            return "Raw Material Save Not Complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateRawMaterial(@RequestBody RawMaterial rawMaterial){
        try {
            rawMaterialDao.save(rawMaterial);
            return "ok";
        }catch (Exception e){
            return "Raw Material Update Not Complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteRawMaterial(@RequestBody RawMaterial rawMaterial){
        try {
            rawMaterial.setRmstatus(false);
            rawMaterialDao.save(rawMaterial);
            return "ok";
        }catch (Exception e){
            return "Delete Raw Material Not Complete"+e.getMessage();
        }
    }








}
