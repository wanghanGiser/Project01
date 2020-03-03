package com.wanghan.controller;

import com.wanghan.controller.dto.LoginRegStatus;
import com.wanghan.pojo.User;
import com.wanghan.service.UserService;
import com.wanghan.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserInfoController {
    private UserService service;
    private LoginRegStatus status;
    @Autowired
    public UserInfoController(UserService service){
        this.service=service;
    }

//    requestParam接受的前端格式不能为json
    @PostMapping("/login")
    public LoginRegStatus login(@RequestBody Map<String,String> map, HttpServletRequest req){
        System.out.println(req.getAttribute("isLogin"));
        status=new LoginRegStatus();
        User statu=service.selectUserByName(map.get("name"));
        if(statu!=null){
            if(statu.getU_pwd().equals(map.get("pwd"))){
                status.setStatus(true);
                status.setLogInfo("ok");
                status.setToken(JWTUtils.createJWT(statu.getU_id(),map.get("name")));
                System.out.println("end");
                return status;
            }
            status.setStatus(false);
            status.setLogInfo("pwderr");
            return status;
        }
        status.setStatus(false);
        status.setLogInfo("nouser");
        return status;
    }
    @PostMapping("/reg")
    public LoginRegStatus reg(@RequestBody Map<String,String> map){
        User str=service.selectUserByName(map.get("name").trim());
        status=new LoginRegStatus();
        if(str==null){
            service.insertUser(new User(map.get("name").trim(),
                    map.get("pwd").trim(),
                    null,null));
            status.setStatus(true);
            status.setLogInfo("ok");
            return status;
        }
        status.setStatus(false);
        status.setLogInfo("userexist");
        return status;
    }
}
