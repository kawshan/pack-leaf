package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.ReportsDao;
import com.packleaf.packleaf.entity.GrnDetails;
import com.packleaf.packleaf.entity.RawMaterial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/stockreport")
public class StockReportController {

    @Autowired
    private ReportsDao reportsDao;

    @GetMapping
    public ModelAndView stockReportView(){
        ModelAndView stockReportUI = new ModelAndView();
        stockReportUI.setViewName("stockreport.html");
        return stockReportUI;
    }

    @GetMapping(value = "/getstockreportby-fromdate-todate-rawmaterialid/{fromdate}/{todate}/{rawmaterialid}")
    public List<GrnDetails> getGrnDetailsByFromDateToDateRawMaterialId(@PathVariable("fromdate") LocalDate fromdate, @PathVariable("todate")LocalDate todate, @PathVariable("rawmaterialid")String rawmaterialid){
        return reportsDao.getStockReportFromAndToDateAndRawMaterialId(fromdate,todate,rawmaterialid);
    }

    @GetMapping(value = "/getjointableresultforstockreport/{rawmaterialid}/{fromdate}/{todate}")
    public List<Object[]> getJoinTableResult(@PathVariable("rawmaterialid") RawMaterial rawmaterialid, @PathVariable("fromdate") LocalDate fromdate, @PathVariable("todate")LocalDate todate){
        return reportsDao.joinTablesResult(rawmaterialid,fromdate,todate);
    }






}
