package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CategoryStatusDao;
import com.packleaf.packleaf.dao.ItemCategoryDao;
import com.packleaf.packleaf.entity.CategoryStatus;
import com.packleaf.packleaf.entity.ItemCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/item-category")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryDao itemCategoryDao;

    @Autowired
    private CategoryStatusDao categoryStatusDao;


    @GetMapping
    public ModelAndView itemCategoryUI(){
        ModelAndView itemCategoryView = new ModelAndView();
        itemCategoryView.setViewName("itemcategory.html");
        return itemCategoryView;
    }


    @GetMapping(value = "/findall")
    public List<ItemCategory> getAllItemCategory(){
        return itemCategoryDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @PostMapping()
    public String saveItemCategory(@RequestBody ItemCategory itemCategory){
        try {
            itemCategoryDao.save(itemCategory);
            return "ok";
        }catch (Exception e){
            return "save item category failed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateItemCategory(@RequestBody ItemCategory itemCategory){
        try {
            itemCategoryDao.save(itemCategory);
            return "ok";
        }catch (Exception e){
            return "update item category failed"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteItemCategory(@RequestBody ItemCategory itemCategory){
        try {
            CategoryStatus deleteCategoryStatus = categoryStatusDao.getReferenceById(3);
            itemCategory.setCategorystatus_id(deleteCategoryStatus);
            itemCategoryDao.save(itemCategory);
            return "ok";
        }catch (Exception e){
            return "delete item category failed"+e.getMessage();
        }
    }


}
