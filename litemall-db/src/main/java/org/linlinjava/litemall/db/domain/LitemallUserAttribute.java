package org.linlinjava.litemall.db.domain;

import java.time.LocalDateTime;

public class LitemallUserAttribute {

    private Integer id;

    private Integer userId;

    private String attribute;

    private String value;

    private LocalDateTime addTime;

    private LocalDateTime updateTime;

    private Integer delete;

    public LitemallUserAttribute(Integer id, Integer userId, String attribute, String value, LocalDateTime addTime, LocalDateTime updateTime, Integer delete) {
        this.id = id;
        this.userId = userId;
        this.attribute = attribute;
        this.value = value;
        this.addTime = addTime;
        this.updateTime = updateTime;
        this.delete = delete;
    }

    public LitemallUserAttribute() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public LocalDateTime getAddTime() {
        return addTime;
    }

    public void setAddTime(LocalDateTime addTime) {
        this.addTime = addTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getDelete() {
        return delete;
    }

    public void setDelete(Integer delete) {
        this.delete = delete;
    }
}
