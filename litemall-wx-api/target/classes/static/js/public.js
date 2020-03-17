//一般直接写在一个js文件中
layui.use(['jquery','element'], function(){
    var $ = layui.jquery;
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var navBtn = $('.nav-btn');
    var nav = $('.layui-nav');
        //错误提示
    var error = $('.error');
    //下拉按钮单机事件
    // navBtn.click(function(){
    //     if(nav.hasClass('layui-nav-pc')){
    //         nav.removeClass('layui-nav-pc');
    //         nav.addClass('layui-nav-mobile');
    //         navBtn.removeClass('nav-btn-status2');
    //         navBtn.addClass('nav-btn-status1');
    //     }else{
    //         nav.removeClass('layui-nav-mobile');
    //         nav.addClass('layui-nav-pc');
    //         navBtn.removeClass('nav-btn-status1');
    //         navBtn.addClass('nav-btn-status2');
    //     }
    // })




        //搜索功能函数
        searchFun()

    //调用手机模式下左上角分类按钮函数
    sortBtnFun();

    loginJudge();


        //搜索功能函数
        function searchFun(){
            let input = document.querySelector(".search-input input");
            let btn = document.querySelector(".search-input button");
            input.addEventListener("keydown", (event) => {
                event.keyCode === 13 ? window.location.href = `/search.html?keyword=${input.value}` : null;
            }, false);
            btn.addEventListener("click", () => {
                window.location.href = `/search.html?keyword=${input.value}`;
            }, false);
        }

    function loginJudge(){
        let avatar = document.querySelector(".header-avatar");
        let dl = document.querySelector(".header-avatar dl");
        let login = document.querySelector(".header-login");

        let accountToken = Cookies.get("X-Litemall-Token");
        let nickName = Cookies.get("nickName");
        if(accountToken){
            // 已经登入
            avatar.style.display = 'inline-block';
            login.style.display = 'none';

            let dd = document.createElement("dd");
            let dd2 = document.createElement("dd");
            dd.innerHTML = nickName;
            dd2.innerHTML = '<a href="javascript:;">退出</a>';
            
            dl.append(dd);
            dl.append(dd2);

            // 实现dd2的退出功能
            dd2.addEventListener("click", () => {
                Cookies.remove("username");
                Cookies.remove("X-Litemall-Token");
                window.location.href = '/login.html#/login';
            }, false);
        }else{
            avatar.style.display = 'none';
            login.style.display = 'inline-block';
        }
    }


    // 手机模式下左上角分类按钮函数
    function sortBtnFun(){
        let sortBtn = document.querySelector(".sort-btn");
    
        let rag = document.querySelector(".rag");
        let myTree = document.querySelector("#my-tree");
        let container = document.querySelector(".container");
    
        sortBtn.addEventListener("click", () => {
            container.style.overflow = 'hidden';
            myTree.style.display = 'block';
            myTree.classList.contains("fadeOutLeft") ? myTree.classList.remove("fadeOutLeft") : null;
            myTree.classList.add("slideInLeft");
            // myTree.classList.add("");
            rag.style.display = 'block';
        }, false);
    
        rag.addEventListener("click", () => {
            container.style.overflow = 'visible';
            myTree.classList.add("fadeOutLeft");
            myTree.classList.remove("slideInLeft");
            rag.style.display = 'none';
        }, false);
    }

 

    //监听导航点击
    element.on('nav(demo)', function(elem){
    //console.log(elem)
    layer.msg(elem.text());
  });
  });