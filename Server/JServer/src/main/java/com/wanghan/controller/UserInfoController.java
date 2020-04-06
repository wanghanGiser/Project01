package com.wanghan.controller;

import com.wanghan.controller.dto.LoginRegStatus;
import com.wanghan.pojo.User;
import com.wanghan.service.RestService;
import com.wanghan.service.ScenicService;
import com.wanghan.service.UserService;
import com.wanghan.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserInfoController {
    private UserService service;
    private LoginRegStatus status;
    private ScenicService scenicService;
    private RestService restService;

    @Autowired
    public UserInfoController(UserService service, ScenicService scenicService, RestService restService) {
        this.service = service;
        this.scenicService = scenicService;
        this.restService = restService;
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
    public LoginRegStatus reg(@RequestBody Map<String, String> map,HttpServletResponse response) {
        User str = service.selectUserByName(map.get("name").trim());
        status = new LoginRegStatus();
        if (str == null) {
            service.insertUser(new User(map.get("name").trim(),
                    map.get("pwd").trim(),
                    null, null,"游客"+map.get("name").hashCode()));
            String token = JWTUtils.createJWT(service.selectUserByName(map.get("name")).getU_id(), map.get("name"));
            status.setToken(token);
            response.setHeader("Access-Control-Expose-Headers", "token");
            response.setHeader("token", token);
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
            map.put("name", u.getU_nname());
            map.put("pic", u.getU_picture());
            return map;
        }
        map.put("status", 0);
        return map;
    }

    @PostMapping("/updatefav")
    public Boolean updateFavo(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        System.out.println(request.getAttribute("isLogin"));
        if (!(Boolean) request.getAttribute("isLogin")) {
            return false;
        }
        System.out.println(request.getAttribute("u_id"));
        int id = (Integer) request.getAttribute("u_id");
        String str = service.selectFavoritesById(id);
        System.out.println(map.get("favo"));
        System.out.println(map.get("mothod"));
        System.out.println(map.get("cata"));
        String favo = map.get("favo").toString();
        if (map.get("mothod").equals("put")) {
            try {
                if (map.get("cata").equals("scenic")) {
                    str = favo + "," + str;
                    service.updateFavoritesById(id, str);
                    scenicService.increase(favo);
                    return true;
                }
                str += (favo + ",");
                service.updateFavoritesById(id, str);
                restService.increase(favo);
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
    public List<List<Map<String, String>>> getFavo(HttpServletRequest request) {
        if (!(Boolean) request.getAttribute("isLogin")) {
            return null;
        }
        String str = service.selectFavoritesById((Integer) request.getAttribute("u_id"));
//        System.out.println(str);
        if (null != str) {
            String[] l1 = str.split(";");
            List<List<Map<String, String>>> list = new ArrayList<List<Map<String, String>>>();
            switch (l1.length) {
                case 1:
                    l1 = l1[0].split(",");
                    list.add(scenicService.selectByIds(l1));
                    return list;
                case 2:
                    String[] buf1 = l1[0].split(",");
                    list.add(scenicService.selectByIds(buf1));
                    String[] buf2 = l1[1].split(",");
                    list.add(restService.selectByIds(buf2));
                    return list;
                default:
                    return null;
            }
        }
        return null;
    }

    @PostMapping("/updateInfo")
    public boolean updateInfo(@RequestParam(value = "file", required = false) CommonsMultipartFile file, @RequestParam(value = "text", required = false) String text, @RequestParam(value = "oldpwd", required = false) String oldpwd, @RequestParam(value = "newpwd", required = false) String newpwd, HttpServletRequest request) {
        if(!(Boolean) request.getAttribute("isLogin")) return false;
        if (file != null) {
            String path = request.getSession().getServletContext().getRealPath("/upload");
            File realPath = new File(path);
            if (!realPath.exists()) {
                realPath.mkdir();
            }
            String filename=request.getAttribute("u_id").toString()+file.getOriginalFilename().hashCode()+"."+file.getContentType().split("/")[1];
            String userImg = realPath + "/" + filename;
            try {
                String oldfilePath=realPath+"/"+service.selectUserById((Integer) request.getAttribute("u_id")).getU_picture();
                File oldFile=new File(oldfilePath);
                if(oldFile.isFile()&&oldFile.exists()){
                    oldFile.delete();
                }
                file.transferTo(new File(userImg));
                service.updatePictureById((Integer) request.getAttribute("u_id"),filename);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if(text!=null){
            service.updateNameById((Integer)request.getAttribute("u_id"),text);
        }
        if(oldpwd!=null){
            User u=service.selectUserById((Integer)request.getAttribute("u_id"));
            if(oldpwd.equals(u.getU_pwd())){
                service.updatePwdById((Integer)request.getAttribute("u_id"),newpwd);
            }
        }
        return true;
    }
}
