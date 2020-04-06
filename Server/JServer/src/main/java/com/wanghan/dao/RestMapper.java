package com.wanghan.dao;

//import com.wanghan.pois.annotations.Param;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RestMapper {
    int getTotal(String keywords);
    List<Map<String,String>> getRests(int start);
    List<Map<String,String>> getAllRest();
    Map<String,Object> getInfoById(@Param("id") String id);
    List<Map<String,String>> search(@Param("keywords") String keywords,@Param("start") int start);
    int increase(String id);
    List<Map<String,String>> selectByIds(String[] list);
    List<Map<String,Object>> getDataSource();
}
