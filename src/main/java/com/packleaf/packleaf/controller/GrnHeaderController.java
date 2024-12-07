package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.GrnHeaderDao;
import com.packleaf.packleaf.entity.GrnHeader;
import com.packleaf.packleaf.entity.OurPoDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/grn-header")
public class GrnHeaderController {

    @Autowired
    private GrnHeaderDao grnHeaderDao;

    @GetMapping
    public ModelAndView grnView(){
        ModelAndView grnUi = new ModelAndView();
        grnUi.setViewName("grn.html");
        return grnUi;
    }

    @GetMapping(value = "/findall")
    public List<GrnHeader> getAllGrnHeader(){
        return grnHeaderDao.findAll();
    }

    @PostMapping
    public ResponseEntity<GrnHeader> saveGrnHeader(@RequestBody GrnHeader grnHeader){
        try {
            String grnHeaderMax = grnHeaderDao.getMaxGrnHeaderKey();
            if (grnHeaderMax==null || grnHeaderMax.equals("")){
                grnHeader.setGrnheaderkey("GRN0001");
            }else {
                grnHeader.setGrnheaderkey(grnHeaderMax);
            }
            GrnHeader savedGrnHeader = grnHeaderDao.save(grnHeader);
            return ResponseEntity.ok(savedGrnHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //put mapping
    @PutMapping
    public String updateGrnHeader(@RequestBody GrnHeader grnHeader){
        try {
            grnHeaderDao.save(grnHeader);
            return "ok";
        }catch (Exception e){
            return "update grn header failed"+e.getMessage();
        }
    }



    //delete mapping
    @DeleteMapping
    public String deleteGrnHeader(@RequestBody GrnHeader grnHeader){
        try {
            grnHeaderDao.deleteAllFromGrnDetailsByGrnHeader(grnHeader.getGrnheaderkey());
            grnHeaderDao.delete(grnHeader);
            return "ok";
        }catch (Exception e){
            return "delete grn header failed"+e.getMessage();
        }
    }



    @GetMapping(value = "/getidfromgrmheaderkey/{grnheaderkey}")
    public Integer getIdFromGrnHeaderKey(@PathVariable("grnheaderkey") String grnheaderkey){
        return grnHeaderDao.getGrnHeaderIdByGrnHeaderKey(grnheaderkey);
    }


    @GetMapping(value = "/getourpodetailsfromourponumber/{ourponumber}")
    public List<OurPoDetail> getOurPoDetailsFromOurPoNumber(@PathVariable("ourponumber") String ourponumber){
        return grnHeaderDao.getOurPoDetailsFromPoNumber(ourponumber);
    }


}
