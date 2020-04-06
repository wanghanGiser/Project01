package com.wanghan.pojo;

public class User{
    private int u_id;
    private String u_name;
    private String u_pwd;
    private String u_favorites;
    private String u_picture;
    private String u_nname;

    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    public String getU_name() {
        return u_name;
    }

    public void setU_name(String u_name) {
        this.u_name = u_name;
    }

    public String getU_pwd() {
        return u_pwd;
    }

    public void setU_pwd(String u_pwd) {
        this.u_pwd = u_pwd;
    }

    public String getU_favorites() {
        return u_favorites;
    }

    public void setU_favorites(String u_favorites) {
        this.u_favorites = u_favorites;
    }

    public String getU_picture() {
        return u_picture;
    }

    public void setU_picture(String u_picture) {
        this.u_picture = u_picture;
    }

    public User(){}

    public User(String u_name, String u_pwd, String u_favorites, String u_picture,String u_nname) {
        this.u_name = u_name;
        this.u_pwd = u_pwd;
        this.u_favorites = u_favorites;
        this.u_picture = u_picture;
        this.u_nname=u_nname;

    }

    public User(Integer u_id, String u_name, String u_pwd, String u_favorites, String u_picture,String u_nname) {
        this.u_id = u_id;
        this.u_name = u_name;
        this.u_pwd = u_pwd;
        this.u_favorites = u_favorites;
        this.u_picture = u_picture;
        this.u_nname=u_nname;
    }

    public String getU_nname() {
        return u_nname;
    }

    public void setU_nname(String u_nname) {
        this.u_nname = u_nname;
    }
}
