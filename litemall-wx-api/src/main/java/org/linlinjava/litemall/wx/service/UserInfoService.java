package org.linlinjava.litemall.wx.service;

import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.util.bcrypt.BCryptPasswordEncoder;
import org.linlinjava.litemall.db.domain.LitemallUser;
import org.linlinjava.litemall.db.service.LitemallUserAttributeService;
import org.linlinjava.litemall.db.service.LitemallUserService;
import org.linlinjava.litemall.wx.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserInfoService {
    @Autowired
    private LitemallUserService userService;

    @Autowired
    private LitemallUserAttributeService litemallUserAttributeService;


    public UserInfo getInfo(Integer userId) {
        LitemallUser user = userService.findById(userId);
        Assert.state(user != null, "用户不存在");
        UserInfo userInfo = new UserInfo();
        userInfo.setNickName(user.getNickname());
        userInfo.setAvatarUrl(user.getAvatar());
        //自定义的相关属性：积分
        Map<String, String> attributes = litemallUserAttributeService.getUserAttributes(userId);
        userInfo.setCookie(Integer.parseInt(attributes.get("cookie")));
        return userInfo;
    }


    /**
     * 不通过（微信登录）注册用户
     */
    @Transactional
    public Object addFromPc(Map<String, String> info, HttpServletRequest request){
        System.out.println(info);
        Map<String,String>  userAtrributes = new HashMap<>();
        //过滤出来 user属性表的信息
        info.keySet()
                .stream()
                .filter(key -> key.equals("university")||key.equals("college")||key.equals("education")
                        ||key.equals("grade")||key.equals("mentor")||key.equals("inviterPhone") )
                .forEach( s -> {
                    userAtrributes.putIfAbsent(s,info.get(s));
                });
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


        //提取出user表的信息
        LitemallUser user = new LitemallUser();
        user.setUsername(info.get("username"));
        String encodedPassword = encoder.encode(info.get("password"));
        user.setPassword(encodedPassword);
        user.setAddTime(LocalDateTime.now());
        user.setMobile(info.get("phone"));
        user.setNickname(info.get("name"));

        userService.add(user);
        litemallUserAttributeService.add(userAtrributes, user.getId());

        return ResponseUtil.ok();
    }
}
