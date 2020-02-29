package com.wanghan.pojo;

public class Scenic {
    private String address;
    private String scenic_id;
    private String contact;
    private String city_lvl1;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getScenic_id() {
        return scenic_id;
    }

    public void setScenic_id(String scenic_id) {
        this.scenic_id = scenic_id;
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

    public String getScenic_level() {
        return scenic_level;
    }

    public void setScenic_level(String scenic_level) {
        this.scenic_level = scenic_level;
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

    public String getLevel_for_order() {
        return level_for_order;
    }

    public void setLevel_for_order(String level_for_order) {
        this.level_for_order = level_for_order;
    }

    public Scenic(String address, String scenic_id, String contact, String city_lvl1, String description, String scenic_level, String location, String default_photo, String name_cn, String level_for_order) {
        this.address = address;
        this.scenic_id = scenic_id;
        this.contact = contact;
        this.city_lvl1 = city_lvl1;
        this.description = description;
        this.scenic_level = scenic_level;
        this.location = location;
        this.default_photo = default_photo;
        this.name_cn = name_cn;
        this.level_for_order = level_for_order;
    }

    public Scenic() {
    }

    private String description;
    private String scenic_level;
    private String location;
    private String default_photo;
    private String name_cn;
    private String level_for_order;
}
