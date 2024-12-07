package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.OurPoDetailDao;
import com.packleaf.packleaf.entity.OurPoDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/ourpodetail")
public class OurPoDetailController {

    @Autowired
    private OurPoDetailDao ourPoDetailDao;

    @GetMapping(value = "/findall")
    public List<OurPoDetail> findAllOurPoDetails() {
        return ourPoDetailDao.findAll();
    }


    @PostMapping
    public String saveOurPoDetail(@RequestBody OurPoDetail ourPoDetail){
        try {
            ourPoDetailDao.save(ourPoDetail);
            return "ok";
        }catch (Exception e){
            return "Our Po Detail Not Saved"+e.getMessage();
        }
    }



    @PutMapping
    public String updateOurPoDetail(@RequestBody OurPoDetail ourPoDetail){
        try {
            ourPoDetailDao.save(ourPoDetail);
            return "ok";
        }catch (Exception e){
            return "Our Po Detail Not Updated"+e.getMessage();
        }
    }


    //delete mapping
    @DeleteMapping
    public String deleteOurPoDetail(@RequestBody OurPoDetail ourPoDetail){
        try {
            ourPoDetailDao.delete(ourPoDetail);
            return "ok";
        }catch (Exception e){
            return "Our PO Detail Delete Not Completed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getourpodetailsfrom-ourpoheaderkey/{ourpoheaderkey}")
    public List<OurPoDetail> getOurPoDetailsFromOurPoHeaderKey(@PathVariable("ourpoheaderkey")String ourpoheaderkey){
        return ourPoDetailDao.getOurPoDetailByOurPoHeaderKey(ourpoheaderkey);
    }



}
