package com.wanghan.service;

import com.wanghan.pojo.Rest;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RestService {
    int getTotal(String keywords);
    List<Map<String,String>> getRests(int start);
    List<Map<String,String>> getAllRest();
    Map<String,Object> getInfoById(String id);
    List<Map<String,String>> search( String keywords,  int start);
    int increase(String id);
}
