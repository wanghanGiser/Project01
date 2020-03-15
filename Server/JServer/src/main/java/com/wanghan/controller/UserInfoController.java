package com.wanghan.controller;

import com.wanghan.controller.dto.LoginRegStatus;
import com.wanghan.pojo.User;
import com.wanghan.service.UserService;
import com.wanghan.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserInfoController {
    private UserService service;
    private LoginRegStatus status;

    @Autowired
    public UserInfoController(UserService service) {
        this.service = service;
    }

    //    requestParam接受的前端格式不能为json
    @PostMapping("/login")
    public LoginRegStatus login(@RequestBody Map<String, String> map, HttpServletRequest req, HttpServletResponse response) {
        status = new LoginRegStatus();
        User statu = service.selectUserByName(map.get("name"));
        if (statu != null) {
            if (statu.getU_pwd().equals(map.get("pwd"))) {
                status.setStatus(true);
                status.setLogInfo("ok");
                String token = JWTUtils.createJWT(statu.getU_id(), map.get("name"));
                status.setToken(token);
                response.setHeader("Access-Control-Expose-Headers", "token");
                response.setHeader("token", token);
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
    public LoginRegStatus reg(@RequestBody Map<String, String> map) {
        User str = service.selectUserByName(map.get("name").trim());
        status = new LoginRegStatus();
        if (str == null) {
            service.insertUser(new User(map.get("name").trim(),
                    map.get("pwd").trim(),
                    null, null));
            status.setStatus(true);
            status.setLogInfo("ok");
            return status;
        }
        status.setStatus(false);
        status.setLogInfo("userexist");
        return status;
    }

    @GetMapping("/info")
    public Map<String, Object> isLogin(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        if ((Boolean) request.getAttribute("isLogin")) {
            User u = service.selectUserById((Integer) request.getAttribute("u_id"));
            map.put("status", 1);
            map.put("name", u.getU_name());
            map.put("pic", u.getU_picture());
            return map;
        }
        map.put("status", 0);
        return map;
    }

    @PostMapping("/updatefav")
    public Boolean updateFavo(@RequestBody Map<String, Object> map,HttpServletRequest request) {
        if(!(Boolean) request.getAttribute("isLogin")){
            return false;
        }
        int id=(Integer) request.getAttribute("u_id");
        String str = service.selectFavoritesById(id);
        String favo = map.get("favo").toString();
        if (map.get("mothod").equals("put")) {
            try {
                if (map.get("cata").equals("scenic")) {
                    str = favo + "," + str;
                    service.updateFavoritesById(id, str);
                    return true;
                }
                str += (favo + ",");
                service.updateFavoritesById(id, str);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }

        service.updateFavoritesById(id, str.replace(favo + ",", ""));
        return true;
    }

    @GetMapping("/getfav")
    public List<String[]> getFavo(HttpServletRequest request) {
        if(!(Boolean)request.getAttribute("isLogin")) {
            return null;
        }
        String str = service.selectFavoritesById((Integer) request.getAttribute("u_id"));
        System.out.println(str);
        if (null != str) {
            String[] l1 = str.split(";");
            List<String[]> list = new ArrayList<String[]>();
            switch (l1.length) {
                case 1:
                    l1 = l1[0].split(",");
                    list.add(l1);
                    return list;
                case 2:
                    String[] buf1 = l1[0].split(",");
                    list.add(buf1);
                    String[] buf2 = l1[1].split(",");
                    list.add(buf2);
                    return list;
                default:
                    return null;
            }
        }
        return null;
    }
}
