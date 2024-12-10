package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.GrnDetailsDao;
import com.packleaf.packleaf.entity.GrnDetails;
import com.packleaf.packleaf.entity.OurPoDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/grn-details")
public class GrnDetailsController {

    @Autowired
    private GrnDetailsDao grnDetailsDao;

    @GetMapping(value = "/findall")
    public List<GrnDetails> findAllGrnDetails(){
        return grnDetailsDao.findAll();
    }

    @PostMapping()
    public String saveGrnDetails(@RequestBody GrnDetails grnDetails){
        try {
                grnDetailsDao.save(grnDetails);
                return "ok";
        }catch (Exception e){
            return "save grn details failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateGrnDetails(@RequestBody GrnDetails grnDetails){
        try {
            grnDetailsDao.save(grnDetails);
            return "ok";
        }catch (Exception e){
            return "update grn details failed"+e.getMessage();
        }
    }


    //delete mapping
    @DeleteMapping
    public String deleteGrnDetails(@RequestBody GrnDetails grnDetails){
        try {
            grnDetailsDao.delete(grnDetails);
            return "ok";
        }catch (Exception e){
            return "delete grn details failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getgrndetailsbygrnheader/{grnheader}")
    public List<GrnDetails> getGrnDetailsByGrnHeader(@PathVariable("grnheader") String grnheader){
        return grnDetailsDao.findByGrnHeader(grnheader);
    }



    @GetMapping(value = "/getremaininggrnquantity/{id}")
    public String getRemainingGrnDetailQuantity(@PathVariable("id") String id){
        return grnDetailsDao.getRemainingGrnDetailQuantity(id);
    }


    @GetMapping(value = "/validateexisting-grndetails-fromourpoid/{ourpoid}")
    public String validateGrnExistingUsingOurPoId(@PathVariable("ourpoid") Integer ourpoid ){
        return grnDetailsDao.getGrnDetailsByOurPoId(ourpoid);
    }





}
