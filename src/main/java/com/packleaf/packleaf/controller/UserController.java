package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dao.UserDao;
import com.packleaf.packleaf.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserDao userDao;


    @GetMapping(value = "/findall")
    public List<User>findAll(){
        return userDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @GetMapping
    public ModelAndView userView (){
        ModelAndView userUI = new ModelAndView();
        userUI.setViewName("user.html");
        return userUI;
    }

    @PostMapping
    public String saveUser(@RequestBody User user){
        try {
            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "save user not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateUser(@RequestBody User user){
        try {
            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "update user not complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteUser(@RequestBody User user){
        try {
            user.setStatus(false);
            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "delete user not complete"+e.getMessage();
        }
    }




}
