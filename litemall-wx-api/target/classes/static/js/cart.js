layui.use(['form', 'jquery', 'layer','slider'], function(){
    var form = layui.form;
    var $ = layui.jquery;
    var layer = layui.layer;
    var slider = layui.slider;
    let windowWidth = window.innerWidth;

    var state = {
        slideNum:""
    }

    let accountToken;
    Cookies.get("X-Litemall-Token")
    ? 
    accountToken = Cookies.get("X-Litemall-Token")
    :
    window.location.href = '/login.html'

    //获取该用户的cart内容;
    getCart();

    addressAdd();

    payPage();

    // 调用cart的input加减按钮方法
    //inputHandle();

    // cart的多选框的单击选中效果函数
    // cartCheckbox();

    // 调用cart中的删除按钮函数
    //cartDelete();

    //pc模式下才调用cart-bar的吸附效果实现函数
    windowWidth > 1100 ? cartBar() : null;

    //cart-bar的全选按钮功能实现函数
    //checkboxAll();


    //获取该用户的cart内容
        function getCart(){
            let cartBox = document.querySelector(".cart-box");

            // console.log(accountToken)
            $.ajax({
                url: '/wx/cart/index',
                type: 'GET',
                // dataType: 'json',
                // data: JSON.stringify(data),
                //data: {name: "xu", foo: 'bar'},
                cache: false,
                headers: { 
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                    'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                    'X-Litemall-Token': accountToken
                },                
                success: function(res){
                    console.log(res);
                    let list = res.data.cartList;

                    // 购物车倒序
                    list.reverse();
                    list.forEach((item, index) => {
                        let div = document.createElement("cart-item");
                        div.className = 'cart-item';
                        div.innerHTML = `
                        <div class="cart-item-checkbox cart-item-box">
                            <form class="layui-form" action="">
                            <div class="layui-form-item">
                                <div class="layui-input-block my-checkbox-block">
                                    <input  type="checkbox" name="" title="" lay-skin="primary"> 
                                </div>
                            </div>
                            </form>
                        </div>
                        <div class="cart-item-img cart-item-box">
                            <img  src=${item.picUrl} alt="">
                        </div>
                        <div class="cart-item-title cart-item-box">
                            <p>${item.goodsName}</p>
                        </div>
                        <div class="cart-item-info cart-item-box">
                            <p>${item.specifications[0]}</p>
                        </div>
                        <div class="cart-item-handle cart-item-box">
                            <button type="button" class="layui-btn layui-btn-sm layui-btn-primary cart-sub-btn">
                            -
                            </button>
                            <div class="layui-input-inline">
                            <input type="text" name="price_min" placeholder="" autocomplete="off" class="goodCountInput layui-input" value=${item.number}>
                            </div>
                            <button type="button" class="layui-btn layui-btn-sm layui-btn-primary cart-add-btn">
                                <!-- <i class="layui-icon">&#xe654;</i> -->
                                +
                            </button>
                        </div>
                        <div class="cart-item-price cart-item-box">
                            <p>￥<span>${item.price}</span></p>
                        </div>
                        <div class="cart-item-delete cart-item-box">
                            <a href="javascript:;">删除</a>
                        </div>
                        `;
                        cartBox.append(div);
                        layui.form.render();
                        inputHandle(index);
                    //     <div class="layui-unselect layui-form-checkbox" lay-skin='primary'>
                    //     <i class="layui-icon layui-icon-ok"><i/>
                    // </div>

                    });
                        // cart的多选框的单击选中效果函数
                    cartCheckbox();

                        //cart-bar的全选按钮功能实现函数
                    checkboxAll();

                        // 调用cart中的删除按钮函数
                    cartDelete();

                    // 多个商品间价格关系函数
                    priceChange();



                    // pay-box呼出和获取购物车中被选中的物品函数
                    //放在getCart函数后执行
                    payBoxFun(list);

                    //单机checkbox后每一次的ajax函数
                    checkboxFun(list);
                },
                error: function(e) {
        
                }
            });
        }
        
    //规定商品数量输入的input的值只能为整数
        function inputHandle(index) {
            // let subBtn = document.querySelector(".cart-sub-btn");
            // let addBtn = document.querySelector(".cart-add-btn");
            // let goodCountInput = document.querySelector(".goodCountInput");
            // let inputValue = goodCountInput.value;
            // goodCountInput.onkeyup = function (event) {
            //     console.log(event.key);
            //     if (isNaN(event.key) && event.key != 'Backspace') {
            //         //输入不是数字
            //         goodCountInput.value = inputValue;
            //     } else {
            //         inputValue = goodCountInput.value;
            //     }
            // }
            // subBtn.onclick = function () {
            //     goodCountInput.value > 1 ? goodCountInput.value = goodCountInput.value - 1 : null;
            // }
            // addBtn.onclick = function () {
            //     goodCountInput.value = 1 * goodCountInput.value + 1
            // }

            let subBtn = document.querySelectorAll(".cart-sub-btn");
            let addBtn = document.querySelectorAll(".cart-add-btn");
            let goodCountInput = document.querySelectorAll(".goodCountInput");
            let inputValue = goodCountInput.value;
            goodCountInput[index].onkeyup = function (event) {
                if (isNaN(event.key) && event.key != 'Backspace') {
                    //输入不是数字
                    goodCountInput[index].value = inputValue;
                } else {
                    inputValue = goodCountInput[index].value;
                }
            }
            subBtn[index].onclick = function () {
                goodCountInput[index].value >= 1 ? goodCountInput[index].value = goodCountInput[index].value - 1 : null;
                                                                // 多个商品间价格关系函数
                                                                priceChange();
            }
            addBtn[index].onclick = function () {
                goodCountInput[index].value = 1 * goodCountInput[index].value + 1;
                                                                // 多个商品间价格关系函数
                                                                priceChange();
            }

  
        }
    
    // cart的多选框的单击选中效果函数
        function cartCheckbox(){
            // 监听cart所有的checkbox的状态，一有改变就更改对应物品栏边框颜色表示选中
            // layui中的checkbox选中需要layui-input-block div
            let checkbox = document.querySelectorAll(".my-checkbox-block div");

            let checkboxInput = document.querySelectorAll(".my-checkbox-block input");

            let allCheckbox = document.querySelector(".my-checkbox-block-all input");

            let allCheckboxDiv = document.querySelector(".my-checkbox-block-all div");

            let status;
            checkbox.forEach((item, index) => {
                item.onclick = () => {
                    //通过判断layui-checkbox的calssList长度来判断该checkbox是否已经被选中
                    if(item.classList.length == 3){
                        // 被选中，为对应cart-item添加选中边框样式class
                        $(".cart-item").eq(index).addClass("cart-item-checked")
                    }else{
                        // 取消选中，取消对应cart-item的选中边框样式class
                        $(".cart-item").eq(index).removeClass("cart-item-checked")
                    }
                    try{
                        checkboxInput.forEach((item, index) => {
                            // console.log("_-----------------")
                            // console.log(item.checked);
                            // item.checked ? status = 1 : status = 0;
                            if(item.checked){
                                status = 1;
                            }else{
                                status = 0;
                                throw new Error("someone be quit");
                            }
                        })
                    }catch(e){
                        console.log(e);
                    }
                    console.log(status);
                    console.log(allCheckbox);
                    console.log(allCheckbox.checked);
                    // status ? allCheckbox.checked = true : allCheckbox.checked = false;
                    // 通过status的真假来判断是否为全选按钮设置为勾选或非勾选
                    if(status){
                        allCheckbox.checked = true;
                        allCheckboxDiv.classList.add("layui-form-checked");
                    }else{
                        allCheckbox.checked = false;
                        allCheckboxDiv.classList.remove("layui-form-checked");
                    }
                    // 多个商品间价格关系函数
                    priceChange();
                }
            })
        }
    
    // 删除功能的实现
        function cartDelete(){
            let delBtn = document.querySelectorAll(".cart-item-delete a");
            console.log(delBtn);
            delBtn.forEach((item, itemIndex) => {
                item.onclick = () => {
                    //eg1
                    layer.confirm('确定后该商品将从购物车清除', {icon: 3, title:'确定要删除该商品？'}, function(index){
                        //do something
                        layer.close(index);
                    });
                }
            });
        }

    //cart-bar 吸附效果实现函数
        function cartBar(){

         

            $(window).scroll(function(){
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();

                if(scrollTop + windowHeight >= scrollHeight - 180 ){
                    $('.cart-bar').removeClass("cart-bar-status1");
                    $('.cart-bar').addClass("cart-bar-status2");
                }else if (scrollTop + windowHeight < scrollHeight - 180 && $(".cart-bar").hasClass('cart-bar-status2')){
                    $('.cart-bar').removeClass("cart-bar-status2");
                    $('.cart-bar').addClass("cart-bar-status1");
                }
          });

        }

        // pay-box呼出和获取购物车中被选中的物品函数
        //放在getCart函数后执行
        function payBoxFun(list){
            let cartPayBtn = document.querySelector(".cart-bar-last-item");
            let payBox = document.querySelector(".pay-box");
            let payItemBox = document.querySelector(".pay-item-box");
              

            
            cartPayBtn.addEventListener("click", () => {




                let checkboxInput = document.querySelectorAll(".my-checkbox-block input");

                let numberInput = document.querySelectorAll(".cart-item-handle input");
                let arr = [];
                checkboxInput.forEach((item, index) => {
                    // item.checked ? arr.push(index) : null;
                    if(item.checked){
                        let data = {
                            index,
                            number:numberInput[index].value * 1
                        }
                        arr.push(data);
                    }
                });
                if(arr.length){
                    payBox.style.display = 'block';

                    let rag = document.querySelector(".rag2");
                    let container = document.querySelector(".container");
    
                    //显示抹布
                    rag.style.display = 'block';
                    //浏览器滚动至顶部
                    window.scrollTo(0, 0);
                    //container的overflow设置改变
                    container.style.overflow = 'hidden';

                    //收货地址形成函数。
                    addressFun();

                    console.log(arr);
                    console.log(list);

                    // 迭代arr数组来对list进行获取显示
                    arr.forEach((item, index) => {
                        console.log(item);
                        let div = document.createElement("div");

                        div.className = 'cart-item';

                        div.innerHTML = `
                        <div class="cart-item-img cart-item-box">
                            <img  src=${list[index].picUrl} alt="">
                        </div>
                        <div class="cart-item-title cart-item-box">
                            <p>${list[index].goodsName}</p>
                        </div>
                        <div class="cart-item-info cart-item-box">
                            <p>${list[index].specifications}</p>
                        </div>
                        <div class="cart-item-info cart-item-box">
                            <p>个数:${item.number}</p>
                        </div>
                        <div class="cart-item-price cart-item-box">
                            <p>￥<span>${list[index].price}</span></p>
                        </div>

                        </div>
                        `
                        payItemBox.append(div);
                    })

                    // 在pay-list形成之后计算总价格至pay-price
                    let payItemPrice = document.querySelectorAll(".pay-box .cart-item-price span");
                    let payAllPrice = document.querySelector(".pay-price span");

                    let sum = 0;
                    //计算payPage总页面价格
                    payItemPrice.forEach((item, index) => {
                        sum += item.innerHTML * 1 * arr[index].number;
                    })
        
                    payAllPrice.innerHTML = sum;
                }else{
                    //用户无选中任何购物车内的产品
                }

            }, false);



        }

    //cart-bar的全选按钮功能实现
        function checkboxAll(){


            // layui中的checkbox选中需要layui-input-block div
            let checkboxAllBtn = document.querySelector(".my-checkbox-block-all div");

            let checkboxInput = document.querySelectorAll(".my-checkbox-block input");
            let checkbox = document.querySelectorAll(".my-checkbox-block div");
            checkboxAllBtn.addEventListener("click", () => {

                if(checkboxAllBtn.classList.length === 2){
                    //取消全选
                    checkboxInput.forEach((item, index) => {
                        item.checked = false;
                    })
                    checkbox.forEach((item, index) => {
                        item.className = 'layui-unselect layui-form-checkbox ';
                        // 被选中，为对应cart-item添加选中边框样式class
                        $(".cart-item").eq(index).removeClass("cart-item-checked")
                    })

                    // 将总价设置为0
                    let totalPrice = document.querySelector(".cart-bar .cart-bar-item .cart-item-price span");
                    totalPrice.innerHTML = '0';
                }else{

                    // 全选
                    checkboxInput.forEach((item, index) => {
                        item.checked = true;
                    })
                    checkbox.forEach((item, index) => {
                        item.className = 'layui-unselect layui-form-checkbox layui-form-checked';
                        // 被选中，为对应cart-item添加选中边框样式class
                        $(".cart-item").eq(index).addClass("cart-item-checked")
                    })

                    let flag = 1;
                    // 多个商品间价格关系函数
                    priceChange(flag);
                }

            }, false);
        }

    // 多个商品间价格关系函数
        function priceChange(flag = 0){
            let checkbox = document.querySelectorAll(".my-checkbox-block input");
            let totalPrice = document.querySelector(".cart-bar .cart-bar-item .cart-item-price span");
            let number = document.querySelectorAll(".cart-item-handle .layui-input-inline input");
            let price = document.querySelectorAll(".cart-item .cart-item-price span");
            // console.log(totalPrice.innerHTML);
            // console.log(number[index].value);
            // console.log(price[index].innerHTML);
            // totalPrice.innerHTML = number[index].value * price[index].innerHTML * 1;
            let Price = 0;
            number.forEach((item, index) => {
                // console.log(checkbox[index]);
                // console.log(checkbox[index].checked);
                flag 
                ?
                Price += item.value * price[index].innerHTML * 1 
                :
                checkbox[index].checked
                ?
                Price += item.value * price[index].innerHTML * 1 
                : null;
                
                
            })

            totalPrice.innerHTML = Price;
        }
    // 订单支付页面形成函数
        function payPage(arr){
            let payBox = document.querySelector(".pay-box");
            // let rag = document.querySelector(".rag");
            let userAddressAddBtn = document.querySelector(".user-address-add");
            let userAddressBox = document.querySelector(".user-address-box");
            let userAddressAddBox = document.querySelector(".user-address-add-box");
            let payboxcloseBtn = document.querySelector(".pay-box-close");
            // 订单中的商品容器，关闭支付页面后要清除
            let payItemBox = document.querySelector(".pay-item-box");
            payboxcloseBtn.addEventListener("click", () => {
                payBox.style.display = 'none';
                // rag.style.display = 'none';
                payItemBox.innerHTML = '';


                let rag = document.querySelector(".rag2");
                let container = document.querySelector(".container");

                //抹布消失
                rag.style.display = 'none';
                //浏览器滚动至顶部
                // window.scrollTo(0, 0);
                //container的overflow设置改变
                container.style.overflow = 'visible';
            }, false);

            userAddressAddBtn.addEventListener("click", () => {
                userAddressBox.style.display = 'none';
                userAddressAddBox.style.display = 'block';
            }, false);

        }

        //收货地址形成函数
        function addressFun(){
            let userAddress = document.querySelector(".user-address");

            $.ajax({
                url: '/wx/address/list',
                type: 'GET',
                // dataType: 'json',
                // data: JSON.stringify(data),
                //data: {name: "xu", foo: 'bar'},
                cache: false,
                headers: { 
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                    'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                    'X-Litemall-Token': accountToken
                },                
                success: function(res){
                    console.log(res);
                    let {
                        list,
                    } = res.data;

                    list.forEach((item, index) => {
                        let div = document.createElement("div");

                        div.className = 'user-address-item';
                        div.innerHTML = `

                            <div class="user-address-province">
                                ${item.province}
                            </div>
                            <div class="user-address-city">
                                ${item.city}
                            </div>
                            <div class="user-address-county">
                                ${item.county}
                            </div>
                            <div class='user-address-detail'>
                                ${item.addressDetail}
                            </div>
                            <div class="user-address-name">
                                ${item.name}
                            </div>
                            <div class="user-address-number">
                                ${item.tel}
                            </div>
                        `;
                        userAddress.append(div);
                    })
                    //收货地址单机后选中状态函数
                    addressSelect();

                    //提交订单函数
                    //放在获取地址函数后面
                    submitPay(list);
                },
                error(){

                }
                });
        }
        //收货地址单机后选中状态函数
        function addressSelect(){
            let addressItem = document.querySelectorAll(".user-address-item");

            addressItem.forEach((item, index) => {
                item.addEventListener("click", () => {
                    addressItem.forEach((item, index) => {
                        if(item.classList.length >= 2){
                            
                            let div = document.querySelector(".user-address-icon");
                            item.classList.remove("user-address-item-selected");
                            item.removeChild(div);
                        }
                    })
                    

                    if(item.classList.length < 2){
                        item.classList.add("user-address-item-selected");
                        let broDiv = document.querySelector(".user-address-item-selected .user-address-province");
                        let div = document.createElement("div");
                        div.className = 'user-address-icon';
                        div.innerHTML = '<img src="http://39.108.110.147:888/address.png" alt="">';
                        item.insertBefore(div,broDiv);
                    }
                }, false);
            })
        }

        //添加新收货地址函数
        function addressAdd(){

            let userAddressAddBtn = document.querySelector(".user-address-add-sub-btn");
            let userAddressWhole = document.querySelectorAll(".user-address-whole select");
            let userAddressInput = document.querySelectorAll(".user-address-add-box input");
            let userAddressBox = document.querySelector(".user-address-box");
            let userAddressAddBox = document.querySelector(".user-address-add-box");
            let userAddressBackBtn = document.querySelector(".user-address-add-back-btn");
            userAddressAddBtn.addEventListener("click", () => {
                let flag = 1;

                for(let item of userAddressWhole){
                    if(!item.value){
                        flag = 0;
                        break;
                    }  
                }

                for(let item of userAddressInput){
                    if(!item.value){
                        flag = 0;
                        break;
                    }  
                }

                if(flag){
                    let data = {
                        id : 0,
                        province : userAddressWhole[0].value,
                        city : userAddressWhole[1].value,
                        county : userAddressWhole[2].value,
                        addressDetail : userAddressInput[0].value,
                        postalCode: userAddressInput[1].value,
                        name :userAddressInput[2].value,
                        tel : userAddressInput[3].value,
                        areaCode : 233,
                        isDefault : false,
                    }
                    $.ajax({
                        url: '/wx/address/save',
                        type: 'POST',
                        // dataType: 'json',
                        data: JSON.stringify(data),
                        //data: {name: "xu", foo: 'bar'},
                        cache: false,
                        headers: { 
                            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                            'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                            'X-Litemall-Token': accountToken
                        },                
                        success: function(res){


                            console.log(res);
                            if(!res.errno){
                                //添加成功
                                layer.msg('添加成功');
                                userAddressBox.style.display = 'block';
                                userAddressAddBox.style.display = 'none';
                                
                                //先将原本的userAddress的内容清楚
                                let userAddress = document.querySelector(".user-address");

                                userAddress.innerHTML = '';

                                //收货地址形成函数
                                addressFun();
                            }else{
                                layer.msg('邮政编码或手机号码格式有误！');
                            }
        
                            // list.forEach((item, index) => {
        
                            // })
                        },
                        error(){
        
                        }
                        });
                }else{
                    alert("有文本框尚未输入")
                }

            }, false);

            userAddressBackBtn.addEventListener("click", () => {
                userAddressBox.style.display = 'block';
                userAddressAddBox.style.display = 'none';

            }, false);



        }

        //单机选择后的每一次checked函数
        function checkboxFun(list){
            let productIds = [];
            let allCheckboxDiv = document.querySelectorAll(".my-checkbox-block div");
            let allCheckbox = document.querySelectorAll(".my-checkbox-block input");
            console.log(allCheckbox)
            allCheckboxDiv.forEach((item, index) => {
                item.addEventListener("click", () => {

                    console.log("XXXXX");
                     
                    let isChecked;
                   
                    if( allCheckbox[index].checked){
                        // isChecked = 1;
                        productIds.push(list[index].productId);
                    }else{
                        // isChecked = 0;
                        productIds.splice(productIds.indexOf(list[index].productId), 1);
                    }

                    let data = {
                        productIds,
                        isChecked : 1,
                    }
                    console.log(data);
                    $.ajax({
                        url: '/wx/cart/checked',
                        type: 'POST',
                        // dataType: 'json',
                        data: JSON.stringify(data),
                        // data,
                        cache: false,
                        headers: { 
                            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                            'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                            'X-Litemall-Token': accountToken
                        },                
                        success: function(res){
                            console.log(res);
                            console.log("点一次发一次的回调")
                        },
                        error: function(e) {
                
                        }
                    });
                }, false);
            })
        }

        //提交订单函数
        //放在获取地址函数后面
        function submitPay(list){
            let payBtn2 = document.querySelector(".pay-btn2");
            
            let userAddressItem = document.querySelectorAll(".user-address-item");

            let addressId;

            payBtn2.addEventListener("click", () => {
                userAddressItem.forEach((item, index) => {
                    if(item.classList.length > 1){
                        //被选中的地址
                        addressId = list[index].id;
                    }
                })

                if(!addressId){
                    //未选择地址！
                    layer.msg("请选择收货地址");
                }else{

                    
                    let data = {
                        cartId: 0,
                        addressId,
                        couponId: -1,
                        message: "",
                        grouponRulesId: 0,
                        grouponLinkId: 0,
                        iscookie:state.slideNum
                    }
                    $.ajax({
                        url: '/wx/order/submit',
                        type: 'POST',
                        // dataType: 'json',
                        data: JSON.stringify(data),
                        // data,
                        cache: false,
                        headers: { 
                            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                            'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                            'X-Litemall-Token': accountToken
                        },                
                        success: function(res){
                            console.log(res);
                            if(!res.errno){
                                //提交订单成功
                                layer.msg("提交订单成功！");
                                // window.location.href = '/list.html';
                            }else{
                                layer.msg("提交订单失败，请稍后再试!");
                            }
                        },
                        error: function(e) {
                
                        }
                    });
                }


            }, false);
        }

    //监听提交
    form.on('submit(formDemo)', function(data){
      layer.msg(JSON.stringify(data.field));
      return false;
    });

    let integral = Cookies.get("integral") * 1;
      //渲染
    slider.render({
        elem: '#integral-slide',  //绑定元素
        max:integral,
        change: function(value){
            state.slideNum = value;
        }
    });
  });