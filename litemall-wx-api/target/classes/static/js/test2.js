//layui模块的使用
layui.use(['jquery', 'laypage'],function(args){
    let $ = layui.jquery;
    var laypage = layui.laypage;
    var flag = 1;

    var search = window.location.search.split("");

    let key = [];
    let varIndex = 0;
    try {
        search.forEach((item, index) => {
            if(index){
                //第一个 ？ 不要
                if(item != '='){
                    key.push(item)
                }else{
                    varIndex = index;
                    throw err;
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    let value = search.splice(varIndex + 1, search.length - 1);
    // console.log(key);
    // console.log(search.splice(varIndex + 1, search.length - 1));    


    // search.splice(0, 9);

    // keyword = search.join("");

    // 调用获搜索结果函数
    getList(key.join(""), value.join(""),flag);

    function getList(key, value, flag = 0){
        // let key;
        // keyword.length > 4
        // ?
        // key = 'keyword'
        // :
        // key = 'categoryId'
        // let listBox = document.querySelector(".list-box");
        // let accountToken;
        // Cookies.get("X-Litemall-Token")
        // ? 
        // accountToken = Cookies.get("X-Litemall-Token")
        // :
        // window.location.href = '/login.html'

        $.ajax({
            url: `/wx/goods/list`,
            type: 'GET',
            // dataType: 'json',
            // data: JSON.stringify(data),
            data:`${key}=${value}`,
            //data: {name: "xu", foo: 'bar'},
            // cache: false,            
            success: function(res){
                let {
                    total,
                    pages,
                    limit,
                    page,
                    list
                } = res.data;
                console.log(res);
                let searchBox = document.querySelector(".search-box");
                laypage.render({
                    elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
                    ,count: total //数据总数，从服务端得到
                    ,limit //每页显示的条数。
                  });

                list.forEach((item, index) => {
                    let a = document.createElement("a");
                    a.className = 'search-item';
                    a.href = `/details.html?goodsId=${item.id}`
                    a.innerHTML = `
                    <div class="search-item-img">
                        <img src=${item.picUrl}>
                    </div>
                    <div class="search-item-name">
                        <p>${item.name}</p>
                    </div>
                    `
                //     <div class="search-item-info">
                //     <p>￥${item.retailPrice}</p>
                // </div>
                // <div class="search-item-price">
                //     <p>商品价格</p>
                // </div>
                // <div class="search-item-time">
                //     <p>备注</p>
                // </div>

                    searchBox.append(a);

                    // if(flag == 1){
                    //     //执行一个laypage实例
                    //     laypage.render({
                    //         elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                    //         count:total,  //数据总数，从服务端得到
                    //         limit,// 每页显示的条数。
                    //         jump:function(obj, first){
                    //             //首次不执行
                    //             if(!first){
                    //                 //do something
                    //                 // 先清楚本页所有
                    //                 let searchItem = document.querySelectorAll(".search-item");
                    //                 searchItem.forEach((item, index) => {
                    //                     searchBox.removeChild(item);
                    //                 })
                    //                 getList(obj.curr);
                    //             }
                    //         }
                    //     });
                    // }
    
                });
                // let {
                //     total,
                //     pages,
                //     limit,
                //     page,
                //     list
                // } = res.data;

                // let div = document.createElement("div");
                // div.className = 'list-item';
                
                // list.forEach((item, index) => {
                //     let listItemBox = document.createElement("div");
                //     listItemBox.className = 'list-item-box';
                //     item.goodsList.forEach((item2, index2) => {
                //         let listItem = document.createElement("div");
                //         listItem.className = 'list-item';
                //         listItem.innerHTML = `
                //         <div class="list-item-img">
                //             <img src=${item2.picUrl} alt="">
                //         </div>
                //         <div class="list-item-name">
                //             <p>${item2.goodsName}</p>
                //         </div>
                //         <div class="list-item-info">
                //             <p>${item2.specifications[0]}</p>
                //         </div>
                //         <div class="list-item-number">
                //         <p>${item2.number}</p>
                //         </div>
                //         <div class="list-item-price">
                //             <p>￥${item2.price}</p>
                //         </div> 
                //         `
                //         listItemBox.append(listItem);
                //     });
                //     let listInfo = document.createElement("div");
                //     listInfo.className = 'list-item-box-info';
                //     listInfo.innerHTML = `
                //         <p>总金额：<span>￥${item.actualPrice}</span> </p>
                //         <p>订单提交时间：2019-5-30</p>
                //     `
                //     listItemBox.append(listInfo);
                //     listBox.append(listItemBox);
                // });

                // if(index == 1){
                //     //执行一个laypage实例
                //     laypage.render({
                //         elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                //         count:total,  //数据总数，从服务端得到
                //         limit,// 每页显示的条数。
                //         jump:function(obj, first){
                //             //首次不执行
                //             if(!first){
                //                 //do something
                //                 // 先清楚本页所有
                //                 let listItemBox = document.querySelectorAll(".list-item-box");
                //                 listItemBox.forEach((item, index) => {
                //                     listBox.removeChild(item);
                //                 })
                //                 getList(obj.curr);

                //             }
                //         }
                //     });
                // }

            },
            error: function(e) {
    
            }
        });


    }



    
  }); 