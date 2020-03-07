package com.wanghan.service;

import com.wanghan.pojo.Scenic;

import java.util.List;
import java.util.Map;

public interface ScenicService {
    List<Map<String,String>> getScenics(int start);
    List<Map<String,String>> getAllScenics();
    Map<String,String> getInfoById(String id);

}
