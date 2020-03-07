package com.wanghan.service;

import com.wanghan.dao.ScenicMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ScenicServiceImpl implements ScenicService{


    private ScenicMapper mapper;
    @Autowired
    public void setMapper(ScenicMapper mapper) {
        this.mapper = mapper;
    }

    public List<Map<String, String>> getScenics(int start) {
        return mapper.getScenics(start);
    }

    public List<Map<String, String>> getAllScenics() {
        return mapper.getAllScenics();
    }

    public Map<String, String> getInfoById(String id) {
        return mapper.getInfoById(id);
    }
}
