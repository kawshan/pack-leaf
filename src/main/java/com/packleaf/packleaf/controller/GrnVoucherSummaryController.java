package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.GrnVoucherSummaryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/grnvouchersummary")
public class GrnVoucherSummaryController {

    @Autowired
    private GrnVoucherSummaryDao grnVoucherSummaryDao;


    @GetMapping
    public ModelAndView grnVoucherSummaryView(){
        ModelAndView grnVoucherSummaryUI = new ModelAndView();
        grnVoucherSummaryUI.setViewName("grnsummary.html");
        return grnVoucherSummaryUI;
    }



    @GetMapping(value = "/getsummaryreport/{fromDate}/{toDate}")
    public List<Object> getSummaryReport(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate){
        return grnVoucherSummaryDao.getGrnSummery(fromDate,toDate);
    }




}
