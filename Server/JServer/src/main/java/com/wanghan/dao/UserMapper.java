package com.wanghan.dao;

import com.wanghan.pojo.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
//    插入用户
    int insertUser(User user);
//    查询
    User selectUserById(int id);
    User selectUserByName(String name);
    String selectPwdByName(String name);
    String selectFavoritesById(int id);
    //更新数据
    int updateUser(User user);
    int updateNameById(@Param("id") int id,@Param("name") String name);
    int updatePwdById(@Param("id") int id,@Param("pwd") String pwd);
    int updateFavoritesById(@Param("id") int id,@Param("fav") String favorites);
    int updatePictureById(@Param("id") int id,@Param("pic") String picture);
}
