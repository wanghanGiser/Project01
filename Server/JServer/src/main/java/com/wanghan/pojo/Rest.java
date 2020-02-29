package com.wanghan.pojo;

public class Rest {
    private String address;
    private String rest_level;
    private String restaurant_id;
    private String contact;
    private String city_lvl1;
    private String description;
    private String city_lvl2;
    private String level_name_for_show;
    private String location;
    private String default_photo;
    private String name_cn;

    public Rest() {
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRest_level() {
        return rest_level;
    }

    public void setRest_level(String rest_level) {
        this.rest_level = rest_level;
    }

    public String getRestaurant_id() {
        return restaurant_id;
    }

    public void setRestaurant_id(String restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getCity_lvl1() {
        return city_lvl1;
    }

    public void setCity_lvl1(String city_lvl1) {
        this.city_lvl1 = city_lvl1;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity_lvl2() {
        return city_lvl2;
    }

    public void setCity_lvl2(String city_lvl2) {
        this.city_lvl2 = city_lvl2;
    }

    public String getLevel_name_for_show() {
        return level_name_for_show;
    }

    public void setLevel_name_for_show(String level_name_for_show) {
        this.level_name_for_show = level_name_for_show;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDefault_photo() {
        return default_photo;
    }

    public void setDefault_photo(String default_photo) {
        this.default_photo = default_photo;
    }

    public String getName_cn() {
        return name_cn;
    }

    public void setName_cn(String name_cn) {
        this.name_cn = name_cn;
    }

    public Rest(String address, String rest_level, String restaurant_id, String contact, String city_lvl1, String description, String city_lvl2, String level_name_for_show, String location, String default_photo, String name_cn) {
        this.address = address;
        this.rest_level = rest_level;
        this.restaurant_id = restaurant_id;
        this.contact = contact;
        this.city_lvl1 = city_lvl1;
        this.description = description;
        this.city_lvl2 = city_lvl2;
        this.level_name_for_show = level_name_for_show;
        this.location = location;
        this.default_photo = default_photo;
        this.name_cn = name_cn;
    }
}
