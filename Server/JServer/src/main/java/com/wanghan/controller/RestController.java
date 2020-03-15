package com.wanghan.controller;

import com.wanghan.service.RestService;
import com.wanghan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/rest")
public class RestController {
    private RestService service;
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setService(RestService service) {
        this.service = service;
    }

    @PostMapping("/rest_list_limit")
    public List<Map<String, String>> getRests(@RequestBody Map<String, Integer> num) {
        return service.getRests((num.get("num")-1)*10);
    }


    @GetMapping("rest_list")
    public List<Map<String,String>> getAllRest(){
        return service.getAllRest();
    }

    @PostMapping("/info")
    public Map<String,String> getFeatureInfo(@RequestBody Map<String,String> map, HttpServletRequest request){

        Map<String,String> res=service.getInfoById(map.get("id"));
        if((Boolean)request.getAttribute("isLogin")){
            res.put("ischecked",(userService.selectFavoritesById((Integer) request.getAttribute("u_id"))).indexOf(map.get("id"))!=-1?"1":"0");
        }
        return res;
    }
}
