//一般直接写在一个js文件中
// 使用原生js路由方式实现一下login和register的切换，哈哈哈真low。。。。。
layui.use(['jquery', 'layer'], function(){
    let $ = layui.jquery;
    let layer = layui.layer;

    let content = document.querySelector("#index-content");
    let router = new Router();

    //调用注册路由函数
    routerRegister();


    // 注册路由函数
    function routerRegister(){
        let login = `
        <div class="login-box">
            <div class="avatar">
                <img class="login-logo" src="http://39.108.110.147:888/formLogo.png" alt="">
            </div>
            <div class="form-box">
                <div class="username-box">
                    <i class="layui-icon layui-icon-username" ></i>  
                    <input type="text" name="title" required  lay-verify="required"
                    placeholder="账户" autocomplete="off" class="layui-input">
                </div>
    
                <div class="passwd-box">
                    <i class="layui-icon layui-icon-password" ></i>  
                    <input type="password" name="title" required  lay-verify="required"
                    placeholder="密码" autocomplete="off" class="layui-input">
                </div>
    
                <div class="register-nav">
                    <a href="#/register">点击去注册</a>
                </div>
    
                <button type="button" class="layui-btn layui-btn-normal login-btn">登录</button>
            </div>
        </div>`;
    
        let register = `
                    <div class="register-box">
                        <div class="avatar clearfix">
                            <img class="login-logo" src="http://39.108.110.147:888/formLogo.png" alt="">
                          </div>
    
                          <div class="form-box">
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-username" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="用户名" autocomplete="off" class="layui-input username">
                              </div>
    
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-password" ></i>  
                                  <input type="password" name="title" required  lay-verify="required"
                                   placeholder="密码" autocomplete="off" class="layui-input password">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-password" ></i>  
                                  <input type="password" name="title" required  lay-verify="required"
                                   placeholder="确认密码" autocomplete="off" class="layui-input conpassword">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-username" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="真实姓名 例如：张三:zs" autocomplete="off" class="layui-input name">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-cellphone-fine" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="手机号码" autocomplete="off" class="layui-input phone">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-read" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="所属大学" autocomplete="off" class="layui-input university">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-component" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="所属学院" autocomplete="off" class="layui-input college">
                              </div>
    
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-tree" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="年级" autocomplete="off" class="layui-input grade">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-template" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="学历" autocomplete="off" class="layui-input education">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-group" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="导师" autocomplete="off" class="layui-input mentor">
                              </div>
                              <!-- 
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-chart-screen" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="所属公司" autocomplete="off" class="layui-input">
                              </div>
                              <div class="form-input-box">
                                  <i class="layui-icon layui-icon-rmb" ></i>  
                                  <input type="text" name="title" required  lay-verify="required"
                                   placeholder="支付方式" autocomplete="off" class="layui-input">
                              </div> -->

    
                              <div class="login-nav">
                                  <a href="#/login">点击去登入</a>
                              </div>
          
                              <button type="button" class="layui-btn layui-btn-normal register-btn">注册</button>
                              <div class="passwordinfo" style="color:red;text-align:center;width:100%;margin-top:20px;">
                              </div>
                          </div>
                    </div>`

                //     <div class="form-input-box">
                //     <i class="layui-icon layui-icon-cellphone-fine" ></i>  
                //     <input type="text" name="title" required  lay-verify="required"
                //      placeholder="邀请人手机号码" autocomplete="off" class="layui-input inviterPhone">
                //   </div>
    
        router.registerIndex(() => content.innerHTML = login);
        router.register("/login", () => {
            content.innerHTML = login;
            //调用登入函数
            loginFun();
        });
        router.register("/register", () => {
            content.innerHTML = register;
            registerFun();
            addIsEqul();
        });
        router.load();
    }


    
        //注册函数
    function registerFun(){
        let registerBtn = document.querySelector(".register-btn");
        if (registerBtn != null){
            registerBtn.addEventListener("click",()=>{
                let username = document.querySelector(".username");
                let password = document.querySelector(".password");
                let conpassword = document.querySelector(".conpassword");
                let name = document.querySelector(".name");
                let phone = document.querySelector(".phone");
                let university = document.querySelector(".university");
                let college = document.querySelector(".college");
                let grade = document.querySelector(".grade");
                let education = document.querySelector(".education");
                let mentor = document.querySelector(".mentor");
                let inviterPhone = document.querySelector(".inviterPhone");
                let passwordinfo = document.querySelector(".passwordinfo");
                
                let data= {
                    username: username.value,
                    password: password.value,
                    conpassword: conpassword.value,
                    name: name.value,
                    phone: phone.value,
                    university: university.value,
                    college: college.value,
                    grade: grade.value,
                    education: education.value,
                    mentor: mentor.value,
                    // inviterPhone: inviterPhone.value,
                }

                let res = infoJuge(data,passwordinfo)
                console.log(res)
                if(res){
                    registerAjax(data)
                    console.log(123)
                }else{
                    passwordinfo.innerHTML = "检查您的填写情况: )"
                }
            })
        }
        
    }

    function infoJuge(data,passwordinfo){

        let flag = true;

        Object.keys(data).forEach((key)=>{
            console.log(key)
            console.log(data[key])
            if(data[key] === '' || data[key] == null ){
                flag = false
            }
        })

        return flag
    }

    function registerAjax(data){
        $.ajax({
            url: '/wx/auth/pcRegister',
            type: 'POST',
            // dataType: 'json',
            data: JSON.stringify(data),
            //data: {name: "xu", foo: 'bar'},
            cache: false,
            headers: { 
                'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
            },                
            success: function(res){
                console.log(res);
                let {errno} = res;
                if(errno == 0){
                    alert("注册成功");
                    window.location.href = "/login.html#/login"
                }else if(errno == 502){
                    passwordinfo.innerHTML = "账户名存在"
                }
            },
            error: function(e) {
    
            }
        });
    }

    function addIsEqul(){
        let passwordinfo = document.querySelector(".passwordinfo");
        let conpassword = document.querySelector(".conpassword");
        let passwd = document.querySelector(".password");

        conpassword.addEventListener("keyup",() => passwordIsEqul(passwd,conpassword,passwordinfo))
        
    }
    
    //密码判重
    function passwordIsEqul(password, conpassword,passwordinfo){
        if(password.value === '' ||conpassword.value === '' ){
            return false
        }
        console.log(password.value,conpassword.value)
        if( password.value != conpassword.value){
            passwordinfo.innerHTML = "两次密码不一致！: )"
            password.addEventListener("keyup",() => {
                if(password.value != conpassword.value){
                    passwordinfo.innerHTML = "两次密码不一致！:)"
                    return 
                }
                passwordinfo.innerHTML = ""
            })
            return false
        }

        passwordinfo.innerHTML = ""
        return true
    }

    // 登入函数
    // function loginFun(){
    //     let loginBtn = document.querySelector(".login-btn");
    //         loginBtn.addEventListener("click", () => {
    //             let username = document.querySelector(".username-box input");
    //             let passwd = document.querySelector(".passwd-box input");
    //             let data =  {
    //                 username : username.value,
    //                 password : passwd.value,
    //             }
    //             $.ajax({
    //                 url: '/wx/auth/login',
    //                 type: 'POST',
    //                 // dataType: 'json',
    //                 data: JSON.stringify(data),
    //                 //data: {name: "xu", foo: 'bar'},
    //                 cache: false,
    //                 headers: { 
    //                     "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
    //                     'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
    //                 },                
    //                 success: function(res){
    //                     if(!res.errno){
    //                         // 登入成功
    //                         let {token} = res.data;
    //                         // layer.msg('只想简单的提示');  
    //                         Cookies.set('X-Litemall-Token', token, { expires: 3 });
    //                         // Cookies.get("accountToken");
    //                         window.location.href = '/';
    //                     }
    //                 },
    //                 error: function(e) {
            
    //                 }
    //             });
    
    
    //         }, false);
    //     }

            // 登入函数
    function loginFun(){
        let loginBtn = document.querySelector(".login-btn");
        loginBtn.addEventListener("click", () => {
            let username = document.querySelector(".username-box input");
            let passwd = document.querySelector(".passwd-box input");
            let data =  {
                username : username.value,
                password : passwd.value,
            }
            $.ajax({
                url: '/wx/auth/login',
                type: 'POST',
                // dataType: 'json',
                data: JSON.stringify(data),
                //data: {name: "xu", foo: 'bar'},
                cache: false,
                headers: { 
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                    'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                },                
                success: function(res){
                    if(!res.errno){
                        // 登入成功
                        let {token} = res.data;
                        // layer.msg('只想简单的提示');  
                        Cookies.set('X-Litemall-Token', token, { expires: 1 });
                        Cookies.set('nickName', res.data.userInfo.nickName, { expires: 1 });
                        // Cookies.get("accountToken");
                        window.location.href = '/';
                    }else{
                        layer.msg('账户或密码有误！');
                    }
                }
                })
            })
    }


  });