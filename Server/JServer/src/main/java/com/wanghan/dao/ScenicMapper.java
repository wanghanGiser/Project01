package com.wanghan.dao;


import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ScenicMapper {
    List<Map<String,String>> getScenics(@Param("start") int start);
    List<Map<String,String>> getAllScenics();
    Map<String,String> getInfoById(String id);
}
