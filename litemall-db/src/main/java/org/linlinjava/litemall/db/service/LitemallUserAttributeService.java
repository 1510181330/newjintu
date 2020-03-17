package org.linlinjava.litemall.db.service;

import org.linlinjava.litemall.db.dao.UserAttributeMapper;
import org.linlinjava.litemall.db.domain.LitemallUserAttribute;
import org.linlinjava.litemall.db.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LitemallUserAttributeService {

    @Autowired
    private UserAttributeMapper userAttributeMapper;

    public void add(Map<String, String> map, Integer userId){
        LitemallUserAttribute record = new LitemallUserAttribute();
        record.setUserId(userId);
        record.setAddTime(LocalDateTime.now());
        record.setUpdateTime(LocalDateTime.now());
        record.setDelete(0);

        map.forEach((key, value) -> {
            record.setAttribute(key);
            record.setValue(value);
            userAttributeMapper.add(record);
        });
    }

    public Map<String, String> getUserAttributes(int id){
        Map<String, String> result = new HashMap<String, String>();
        List<LitemallUserAttribute> attributes = userAttributeMapper.getcookie(id);
        for(LitemallUserAttribute attribute:attributes){
            result.put(attribute.getAttribute(), attribute.getValue());
        }
        return result;
    }

}
