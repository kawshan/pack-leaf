package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.RawMaterialCategoryDao;
import com.packleaf.packleaf.entity.RawMaterialCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/rawmaterialcategory")
public class RawMaterialCategoryController {

    @Autowired
    private RawMaterialCategoryDao rawMaterialCategoryDao;


    @GetMapping(value = "/findall")
    public List<RawMaterialCategory> getAllRawMaterialCategory(){
        return rawMaterialCategoryDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView rawMaterialCategoryView(){
        ModelAndView rawMaterialCategoryUI = new ModelAndView();
        rawMaterialCategoryUI.setViewName("rawmaterialcategory.html");
        return rawMaterialCategoryUI;
    }

    @PostMapping
    public String saveRawMaterialCategory(@RequestBody RawMaterialCategory rawMaterialCategory){
        try {

            RawMaterialCategory existingRawMaterialCategory = rawMaterialCategoryDao.getRawMaterialCategoryByRmctname(rawMaterialCategory.getRmctname());
            if (existingRawMaterialCategory!=null){
                return "cannot perform save rawmaterial category "+rawMaterialCategory.getRmctname()+" already exist";
            }


            String getMaxRaeMaterialCategoryKey = rawMaterialCategoryDao.getMaxRawMaterialCategory();
            if (getMaxRaeMaterialCategoryKey==null || getMaxRaeMaterialCategoryKey.equals("")){
                rawMaterialCategory.setRmctkey("RMC0001");
            }else {
                rawMaterialCategory.setRmctkey(getMaxRaeMaterialCategoryKey);
            }
            rawMaterialCategoryDao.save(rawMaterialCategory);
            return "ok";
        }catch (Exception e){
            return "save raw material category not complete"+e.getMessage();
        }
    }


    @PutMapping
    public String modifyRawMaterialCategory(@RequestBody RawMaterialCategory rawMaterialCategory){
        try {
            rawMaterialCategoryDao.save(rawMaterialCategory);
            return "ok";
        }catch (Exception e){
            return "update raw material category not complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String DeleteRawMaterialCategory(@RequestBody RawMaterialCategory rawMaterialCategory){
        try {
            rawMaterialCategory.setRmctstatus(false);
            rawMaterialCategoryDao.save(rawMaterialCategory);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }












}