package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.CustomerDao;
import com.packleaf.packleaf.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {

    @Autowired
    private CustomerDao customerDao;

    @GetMapping
    public ModelAndView customerView(){
        ModelAndView customerUI = new ModelAndView();
        customerUI.setViewName("customer");
        return customerUI;
    }


    @GetMapping(value = "/findall")
    public List<Customer> getAllCustomers(){
        return customerDao.findAll();
    }

    @PostMapping
    public String addCustomer(@RequestBody Customer customer){
        try {
            String customerNextKey = customerDao.getCustomerNextKey();
            if (customerNextKey == null || customerNextKey.equals("")) {
                customer.setCustomerkey("CM0001");
            }else {
                customer.setCustomerkey(customerNextKey);
            }


            customerDao.save(customer);
            return "ok";
        }catch (Exception e){
            return "save not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateCustomer(@RequestBody Customer customer){
        try {
            customerDao.save(customer);
            return "ok";
        }catch (Exception e){
            return "update not complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteCustomer(@RequestBody Customer customer){
        try {
            customer.setCustomerstatus(false);
            customerDao.save(customer);
//            customerDao.delete(customer);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }












}
