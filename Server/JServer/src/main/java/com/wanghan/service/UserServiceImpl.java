package com.wanghan.service;

import com.wanghan.dao.UserMapper;
import com.wanghan.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserMapper mapper;
    @Autowired
    public void setMapper(UserMapper mapper) {
        this.mapper = mapper;
    }


    public int insertUser(User user) {
        return mapper.insertUser(user);
    }


    public User selectUserById(int id) {
        return mapper.selectUserById(id);
    }


    public User selectUserByName(String name) {
        return mapper.selectUserByName(name);
    }


    public String selectPwdByName(String name) {
        return mapper.selectPwdByName(name);
    }


    public String selectFavoritesById(int id) {
        return mapper.selectFavoritesById(id);
    }


    public int updateUser(User user) {
        return mapper.updateUser(user);
    }


    public int updatePwdById(int id, String pwd) {
        return mapper.updatePwdById(id,pwd);
    }


    public int updateFavoritesById(int id, String favorites) {
        return mapper.updateFavoritesById(id,favorites);
    }


    public int updatePictureById(int id, String picture) {
        return mapper.updatePictureById(id,picture);
    }
}
