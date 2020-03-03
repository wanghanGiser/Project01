package com.wanghan.utils;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtils {
    private static final long EXPIRE_DATE = 24*60*60*1000;
    //token秘钥
    private static Key signingKey = Keys.hmacShaKeyFor("25291da93425d1752e974311811106ba8b435aa08b2075f2c5e1577632624d71".getBytes());

    public static String createJWT(int userID, String userName) {
        long now=System.currentTimeMillis();
        // 生成秘钥
        // 设置JWT所存储的信息
        JwtBuilder builder = Jwts.builder()
                .setHeaderParam("kid", "123456")
                .setSubject("111")
                .setIssuer("wanghan")
                .setNotBefore(new Date(now))
                .claim("userID", userID)
                .claim("userName", userName)
                .signWith(signingKey);
        //builder.claim("name", "value"); //存储自定义信息
        // 设置过期时间
        builder.setExpiration(new Date( now+ EXPIRE_DATE));
        // 构建JWT并将其序列化为紧凑的URL安全字符串
        return builder.compact();
    }

    public static Map<String,Object> parseJWT(String jws){
        Jws<Claims> jwsR;
        Map<String,Object> map=new HashMap<String, Object>();
        try {
            jwsR = Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(jws);
//            System.out.println(jwsR.getBody().get("weisha"));
            map.put("success",true);
            map.put("userID",jwsR.getBody().get("userID"));
            map.put("userName",jwsR.getBody().get("userName"));
            return map;
        } catch (JwtException ex) {
            map.put("success",false);
            map.put("body",null);
            return map;
        }
    }

}