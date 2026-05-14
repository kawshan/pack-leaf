package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dto.AllItemStockReportDto;
import com.packleaf.packleaf.service.AllItemStockReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/AllItemStockReport")
public class AllItemsStockReportController {


    @Autowired
    private AllItemStockReportService allItemStockReportService;


    @GetMapping(value = "/{fromDate}/{toDate}")
    public List<AllItemStockReportDto> getAllItemStockReport(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate) {
        return allItemStockReportService.getAllItemStockReport(fromDate, toDate);
    }




}
