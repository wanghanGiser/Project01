package com.wanghan.controller;

import com.wanghan.service.ScenicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scenic")
public class ScenicController {

    private ScenicService service;

    @Autowired
    public void setService(ScenicService service) {
        this.service = service;
    }

    @PostMapping("/scenic_list_limit")
    public List<Map<String, String>> getScenics(@RequestBody Map<String, Integer> num, HttpServletRequest req) {
        System.out.println(new Date() + "------" + (num.get("num") - 1) * 10);
        return service.getScenics((num.get("num") - 1) * 10);
    }

    @GetMapping("/scenic_list")
    public List<Map<String, String>> getAllScenics() {
        return service.getAllScenics();
    }

    @PostMapping("/info")
    public Map<String, String> getFeatureInfo(@RequestBody Map<String, String> map) {
        return service.getInfoById(map.get("id"));
    }
}
