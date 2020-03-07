package com.wanghan.dao;

//import com.wanghan.pois.annotations.Param;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RestMapper {
    List<Map<String,String>> getRests(int start);
    List<Map<String,String>> getAllRest();
    Map<String,String> getInfoById(@Param("id") String id);
}
