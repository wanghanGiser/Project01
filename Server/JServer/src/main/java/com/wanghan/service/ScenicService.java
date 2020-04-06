package com.wanghan.service;

import com.wanghan.pojo.Scenic;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ScenicService {
    int getTotal(String keywords);
    List<Map<String,String>> getScenics(int start);
    List<Map<String,String>> getAllScenics();
    Map<String,Object> getInfoById(String id);
    List<Map<String,String>> search(String keywords, int start);
    int increase(String id);
    List<Map<String,String>> selectByIds(String[] list);
    List<Map<String,Object>> getDataSource();
}
