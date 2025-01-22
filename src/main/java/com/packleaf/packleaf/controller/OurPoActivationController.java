package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.OurPoActivationDao;
import com.packleaf.packleaf.entity.OurPoActivation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/ourpoactivation")
public class OurPoActivationController {

    @Autowired
    private OurPoActivationDao ourPoActivationDao;

    @GetMapping(value = "/findall")
    public List<OurPoActivation> getAllOurPoActivation(){
        return ourPoActivationDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @GetMapping
    public ModelAndView ourPoActivationUI(){
        ModelAndView ourPoActivationView = new ModelAndView();
        ourPoActivationView.setViewName("ourpoactivation.html");
        return ourPoActivationView;
    }

    @PostMapping
    public String saveOurPoActivation(@RequestBody OurPoActivation ourPoActivation){
        try {

            OurPoActivation existingOurPoActivation = ourPoActivationDao.validateExistingOurPoActivation(ourPoActivation.getOurpoheader_id().getId());
            if (existingOurPoActivation != null) {
                return "Our Po Activation"+ ourPoActivation.getOurpoheader_id().getOurponumber() +"Already Exists";
            }

            ourPoActivationDao.save(ourPoActivation);
            return "ok";
        }catch (Exception e){
            return "Save Our Purchase Order Activation"+e.getMessage();
        }
    }


    @PutMapping
    public String updateOurPoActivation(@RequestBody OurPoActivation ourPoActivation){
        try {
            ourPoActivationDao.save(ourPoActivation);
            return "ok";
        }catch (Exception e){
            return "Update Our Purchase Order Activation"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteOurPoActivation(@RequestBody OurPoActivation ourPoActivation){
        try {
            ourPoActivation.setActivation_status(false);
            ourPoActivationDao.save(ourPoActivation);
            return "ok";
        }catch (Exception e){
            return "Delete Our Purchase Order Activation"+e.getMessage();
        }
    }


    @GetMapping(value = "/getourpoactivationstatusfromponumber/{ourpoNumber}")
    public Boolean getOurPoActivationStatusByOurPoNumber(@PathVariable("ourpoNumber") String ourpoNumber){

        OurPoActivation ourPoActivationFromOurPoNumber = ourPoActivationDao.getOurPoActivationByOurPoNumber(ourpoNumber);

        if (ourPoActivationFromOurPoNumber!=null){
            return true;
        }else {
            return false;
        }
    }



}
