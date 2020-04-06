package com.wanghan.dao;


import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ScenicMapper {
    int getTotal(String keywords);
    List<Map<String,String>> getScenics(@Param("start") int start);
    List<Map<String,String>> getAllScenics();
    Map<String,Object> getInfoById(String id);
    List<Map<String,String>> search(@Param("keywords") String keywords,@Param("start") int start);
    int increase(String id);
    List<Map<String,String>> selectByIds(String[] list);
    List<Map<String,Object>> getDataSource();
}
