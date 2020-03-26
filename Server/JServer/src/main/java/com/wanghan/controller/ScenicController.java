package com.wanghan.controller;

import com.wanghan.pojo.Scenic;
import com.wanghan.service.ScenicService;
import com.wanghan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
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
    public Map<String,Object> getScenics(@RequestBody Map<String, Integer> num, HttpServletRequest req) {
        int total=service.getTotal(null);
        List<Map<String,String>> list=service.getScenics((num.get("num") - 1) * 10);
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("total",total);
        map.put("results",list);
        return map;
    }

    @GetMapping("/scenic_list")
    public List<Map<String, String>> getAllScenics(HttpServletRequest req) {
        return service.getAllScenics();
    }

    @PostMapping("/info")
    public Map<String, Object> getFeatureInfo(@RequestBody Map<String, String> map,HttpServletRequest request) {
        Map<String,Object> map1=service.getInfoById(map.get("id"));
        if((Boolean) request.getAttribute("isLogin")){
            map1.put("ischecked",(userService.selectFavoritesById((Integer) request.getAttribute("u_id")))!=null&&(userService.selectFavoritesById((Integer) request.getAttribute("u_id"))).indexOf(map.get("id"))!=-1?"1":"0");
        }
        return map1;
    }
    @PostMapping("/search")
    public Map<String,Object> search(@RequestBody Map<String,Object> map){
        int total=service.getTotal(map.get("txt").toString());
        List<Map<String,String>> list=service.search(map.get("txt").toString(),((Integer) map.get("num")-1)*10);
        Map<String,Object> map1=new HashMap<String, Object>();
        map1.put("total",total);
        map1.put("results",list);
        return map1;
    }
}
