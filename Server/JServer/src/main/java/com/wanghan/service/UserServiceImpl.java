package com.wanghan.service;

import com.wanghan.dao.UserMapper;
import com.wanghan.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserMapper mapper;

    @Autowired
    public void setMapper(UserMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public int insertUser(User user) {
        return mapper.insertUser(user);
    }

    @Override
    public User selectUserById(int id) {
        return mapper.selectUserById(id);
    }

    @Override
    public String selectPwdByName(String name) {
        return mapper.selectPwdByName(name);
    }

    @Override
    public String selectFavoritesById(int id) {
        return mapper.selectFavoritesById(id);
    }

    @Override
    public int updateUser(User user) {
        return mapper.updateUser(user);
    }

    @Override
    public int updatePwdById(int id, String pwd) {
        return mapper.updatePwdById(id,pwd);
    }

    @Override
    public int updateFavoritesById(int id, String favorites) {
        return mapper.updateFavoritesById(id,favorites);
    }

    @Override
    public int updatePictureById(int id, String picture) {
        return mapper.updatePictureById(id,picture);
    }
}
