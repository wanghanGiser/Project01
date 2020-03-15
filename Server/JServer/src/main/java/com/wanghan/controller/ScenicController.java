package com.wanghan.controller;

import com.wanghan.service.ScenicService;
import com.wanghan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scenic")
public class ScenicController {
 
    private ScenicService service;
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setService(ScenicService service) {
        this.service = service;
    }

    @PostMapping("/scenic_list_limit")
    public List<Map<String, String>> getScenics(@RequestBody Map<String, Integer> num, HttpServletRequest req) {
        return service.getScenics((num.get("num") - 1) * 10);
    }

    @GetMapping("/scenic_list")
    public List<Map<String, String>> getAllScenics(HttpServletRequest req) {
        return service.getAllScenics();
    }

    @PostMapping("/info")
    public Map<String, String> getFeatureInfo(@RequestBody Map<String, String> map,HttpServletRequest request) {
        Map<String,String> map1=service.getInfoById(map.get("id"));
        if((Boolean) request.getAttribute("isLogin")){
            map1.put("ischecked",(userService.selectFavoritesById((Integer) request.getAttribute("u_id"))).indexOf(map.get("id"))!=-1?"1":"0");
        }
        return map1;
    }
}
