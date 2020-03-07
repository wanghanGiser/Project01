package com.wanghan.service;

import com.wanghan.dao.RestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RestServiceImpl implements RestService{

    private RestMapper mapper;

    @Autowired
    public void setMapper(RestMapper mapper) {
        this.mapper = mapper;
    }

    public List<Map<String, String>> getRests(int start) {
        return mapper.getRests(start);
    }

    public List<Map<String, String>> getAllRest() {
        return mapper.getAllRest();
    }

    public Map<String, String> getInfoById(String id) {
        return mapper.getInfoById(id);
    }
}
