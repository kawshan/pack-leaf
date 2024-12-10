package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.OurPoHeaderDao;
import com.packleaf.packleaf.entity.OurPoHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/ourpoheader")
public class OurPoHeaderController {

    @Autowired
    private OurPoHeaderDao ourPoHeaderDao;

    @GetMapping
    public ModelAndView ourPoHeaderView (){
        ModelAndView ourPoHeaderUI = new ModelAndView();
        ourPoHeaderUI.setViewName("ourpurchaseorder.html");
        return ourPoHeaderUI;
    }

    @GetMapping(value = "/findall")
    public List<OurPoHeader> getAllOurPoHeaders(){
        return ourPoHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @PostMapping
    public ResponseEntity<OurPoHeader> saveOurPoHeader(@RequestBody OurPoHeader ourPoHeader){
        try {
                String getMaxOurPoHeaderKey = ourPoHeaderDao.maxOurPoHeaderKey();
                if (getMaxOurPoHeaderKey==null || getMaxOurPoHeaderKey.equals("")){
                    ourPoHeader.setOurpokey("OPO0001");
                }else {
                    ourPoHeader.setOurpokey(getMaxOurPoHeaderKey);
                }
                OurPoHeader savedOurPoHeader = ourPoHeaderDao.save(ourPoHeader);
                return ResponseEntity.ok(savedOurPoHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //update mapping
    @PutMapping
    public String updateOurPoHeader(@RequestBody OurPoHeader ourPoHeader){
        try {
            ourPoHeaderDao.save(ourPoHeader);
            return "ok";
        }catch (Exception e){
            return "OurPoHeader update failed"+e.getMessage();
        }
    }


    //delete mapping
    @DeleteMapping
    public String deleteOurPoHeader(@RequestBody OurPoHeader ourPoHeader){
        try {

            //header eka delete karana kotama ekata adala details tikath delete karanwa header ekan key eka aran eka thiyenawa da balanawa details table eke iita passe header eke key eka aran ee key eka adala records okkoma delete karanwa.
            ourPoHeaderDao.removeOurPoDetailsFromOPOHeaderKey(ourPoHeader.getOurpokey());
            ourPoHeaderDao.delete(ourPoHeader);
            return "ok";
        }catch (Exception e){
            return "OurPoHeader delete failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getidfrom-opo-key/{opokey}")
    public String getIdFromOPOKey(@PathVariable("opokey")String opokey){
        return ourPoHeaderDao.getOPOIdFromOpoKey(opokey);
    }


    @GetMapping(value = "/getmaxponumber")
    public String getMaxPoNumber(){
    String existingPoNumber = ourPoHeaderDao.getMaxPoNumber();
    if (existingPoNumber==null || existingPoNumber.equals("")){
        return "1001";
    }else {
        return ourPoHeaderDao.getMaxPoNumber();
    }


    }



}
