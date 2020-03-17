//layui模块的使用
layui.use(['jquery', 'laypage'],function(args){
    let $ = layui.jquery;
    var laypage = layui.laypage;


    // 调用获取订单列表函数
    getList(1);

    function getList(index){
        let data = {
            page : index,
        };
        let listBox = document.querySelector(".list-box");
        let accountToken;
        Cookies.get("X-Litemall-Token")
        ? 
        accountToken = Cookies.get("X-Litemall-Token")
        :
        window.location.href = '/login.html'
        $.ajax({
            url: '/wx/order/list',
            type: 'GET',
            // dataType: 'json',
            // data: JSON.stringify({data}),
            data:data,
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
                    total,
                    pages,
                    limit,
                    page,
                    list
                } = res.data;

                let div = document.createElement("div");
                div.className = 'list-item';
                
                list.forEach((item, index) => {
                    let listItemBox = document.createElement("div");
                    listItemBox.className = 'list-item-box';
                    item.goodsList.forEach((item2, index2) => {
                        let listItem = document.createElement("div");
                        listItem.className = 'list-item';
                        listItem.innerHTML = `
                        <div class="list-item-img">
                            <img src=${item2.picUrl} alt="">
                        </div>
                        <div class="list-item-name">
                            <p>${item2.goodsName}</p>
                        </div>
                        <div class="list-item-info">
                            <p>${item2.specifications[0]}</p>
                        </div>
                        <div class="list-item-number">
                        <p>${item2.number}</p>
                        </div>
                        <div class="list-item-price">
                            <p>￥${item2.price}</p>
                        </div> 
                        `
                        listItemBox.append(listItem);
                    });
                    let listInfo = document.createElement("div");
                    listInfo.className = 'list-item-box-info';
                    listInfo.innerHTML = `
                        <p>总金额：<span>￥${item.actualPrice}</span> </p>
                        <p>订单提交时间：2019-5-30</p>
                    `
                    listItemBox.append(listInfo);
                    listBox.append(listItemBox);
                });

                if(index == 1){
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                        count:total,  //数据总数，从服务端得到
                        limit,// 每页显示的条数。
                        jump:function(obj, first){
                            //首次不执行
                            if(!first){
                                //do something
                                // 先清楚本页所有
                                let listItemBox = document.querySelectorAll(".list-item-box");
                                listItemBox.forEach((item, index) => {
                                    listBox.removeChild(item);
                                })
                                getList(obj.curr);

                            }
                        }
                    });
                }

            },
            error: function(e) {
    
            }
        });
    }



    
  }); 