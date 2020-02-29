package com.wanghan.dao;

import com.wanghan.pojo.Rest;

import java.util.List;
import java.util.Map;

public interface RestMapper {
    List<Map<String,String>> getRests();
}
