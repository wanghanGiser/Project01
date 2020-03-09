package com.wanghan.utils;
import com.wanghan.pojo.User;
import com.wanghan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class JWTInterceptor implements HandlerInterceptor {
    private UserService service;

    @Autowired
    public void setService(UserService service) {
        this.service = service;
    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token=request.getHeader("Authorization");
        if(null!=token){
            Map<String,Object> map=JWTUtils.parseJWT(token);
            if((Boolean)map.get("success")){
                int uID= (Integer) map.get("userID");
                String uname= (String) map.get("userName");
                User user=service.selectUserById(uID);
                if(uname.equals(user.getU_name())){
                    request.setAttribute("isLogin",true);
                    response.setHeader("Access-Control-Expose-Headers","token");
                    response.setHeader("token",JWTUtils.createJWT(uID,uname));
                    return true;
                }
            }
        }
        request.setAttribute("isLogin",false);
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}
