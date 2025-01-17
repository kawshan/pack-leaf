package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.ItemDao;
import com.packleaf.packleaf.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/item")
public class ItemController {


    @Autowired
    private ItemDao itemDao;

    @GetMapping(value = "/findall")
    public List<Item> getAllItems(){
        return itemDao.findAll(Sort.by(Sort.Direction.ASC,"code"));
    }

    @GetMapping
    public ModelAndView ItemView(){
        ModelAndView itemUi = new ModelAndView();
        itemUi.setViewName("item.html");
        return itemUi;
    }

    @PostMapping
    public String addItem(@RequestBody Item item){
        try {

            Item existingItem = itemDao.getItemByItemName(item.getItmname());
            if (existingItem!=null){
                return "Cannot Perform Add Item "+item.getItmname()+" Already Exists";
            }


            //set item number
            String nextItemKey = itemDao.getMaxItemKey();
            if (nextItemKey==null || nextItemKey.equals("")){
                item.setImkey("IM0001");
            }else {
                item.setImkey(nextItemKey);
            }
            itemDao.save(item);
            return "ok";
        }catch (Exception e){
            return "save not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateItem(@RequestBody Item item){
        try {
            itemDao.save(item);
            return "ok";
        }catch (Exception e){
            return "update not complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteItem(@RequestBody Item item){
        try {
            item.setStatus(false);
            itemDao.save(item);
//            itemDao.delete(item);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }

    @GetMapping(value = "/getitembyitemname/{itemName}")
    public Item getItemByItemName(@PathVariable("itemName") String itemName){
        return itemDao.getItemByItemName(itemName);
    }

    //meka apita one venne job master eke many to many relation eka nisa -> refill ekedi daapu nathi item tika ganna one nisa
    @GetMapping(value = "/jobwithoutitems/{jobmasterId}")
    public List<Item> getJobWithoutItems(@PathVariable Integer jobmasterId){
        return itemDao.getJobWithoutItems(jobmasterId);
    }

}
