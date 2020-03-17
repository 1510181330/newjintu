package org.linlinjava.litemall.db.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.linlinjava.litemall.db.domain.LitemallUserAttribute;

import java.util.List;

@Mapper
public interface UserAttributeMapper {

    @Insert("INSERT INTO " +
            "`litemall_user_attribute` (litemall_user_attribute.user_id, " +
            "litemall_user_attribute.attribute, litemall_user_attribute.`value`, " +
            "litemall_user_attribute.add_time, litemall_user_attribute.update_time, " +
            "litemall_user_attribute.`delete`) " +
            "VALUES(#{userId}, #{attribute}, #{value}, #{addTime}, #{updateTime}, #{delete})")
    void add(LitemallUserAttribute record);

    @Select("SELECT * FROM `litemall_user_attribute` where litemall_user_attribute.user_id=#{id}")
    List<LitemallUserAttribute> getcookie(int id);
}