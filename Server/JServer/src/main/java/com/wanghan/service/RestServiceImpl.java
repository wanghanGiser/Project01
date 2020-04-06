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

    public int getTotal(String keywords) {
        return mapper.getTotal(keywords);
    }

    public List<Map<String, String>> getRests(int start) {
        return mapper.getRests(start);
    }

    public List<Map<String, String>> getAllRest() {
        return mapper.getAllRest();
    }

    public Map<String, Object> getInfoById(String id) {
        return mapper.getInfoById(id);
    }

    public List<Map<String, String>> search(String keywords, int start) {
        return mapper.search(keywords,start);
    }

    public int increase(String id) {
        return mapper.increase(id);
    }

    public List<Map<String, String>> selectByIds(String[] list) {
        return mapper.selectByIds(list);
    }

    public List<Map<String, Object>> getDataSource() {
        return mapper.getDataSource();
    }
}
