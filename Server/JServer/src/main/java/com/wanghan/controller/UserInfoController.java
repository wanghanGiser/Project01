package com.wanghan.controller;

import com.wanghan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserInfoController {
    private UserService service;
    @Autowired
    public UserInfoController(UserService service){
        this.service=service;
    }

//    requestParam接受的前端格式不能为json
    @RequestMapping("/login")
    public boolean login(@RequestBody Map<String,String> map){
        String statu=service.selectPwdByName(map.get("name"));
        if(statu!=null){
            if(statu.equals(map.get("pwd"))){
                return true;
            }
            return false;
        }
        return false;
    }
    @RequestMapping("/reg")
    public Object reg(@RequestBody Map<String,String> map){
        System.out.println(map.get("name"));
        return map.get("name");
    }
}
