//一般直接写在一个js文件中
layui.use(['jquery','flow'], function(){
    var flow = layui.flow;
    var $ = layui.jquery;


    $.ajax({
        type: "GET",
        url: "wx/goods/list",
        data: "categoryId=1005",
        success: function(res){
            console.log(":(");
            console.log(res);
        },
        error: function(){
            goods.innerHTML = '不好意思，获取热销商品失败了，请稍后重试'
        }
     });

    // 调用获得热卖品函数
    getHotGoods();

    //调用获取新平函数
    getNewGoods();
    
    //错误提示
    var error = $('.error');

    // 获取热卖品
    function getHotGoods(){
        let goods = document.querySelector(".goods");

        $.ajax({
            type: "GET",
            url: "wx/goods/list",
            data: "isHot=true",
            success: function(res){
                let data = res.data.list;
                data.forEach((item, index) => {
                    let div = document.createElement("div");
                    div.className = 'card-box';
                    div.innerHTML = `
                    <a onclick="location.assign('/details.html?goodsId=${item.id}')" href='javascript:;' id=${item.goodsId} class='card'>
                    <img src=${item.picUrl}  />
                    <p  class='good-name'>
                          ${item.name} 
                    </p>
                    <p  class='good-price'>
                          <span>￥${item.retailPrice}</span>
                          <span><button class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal">查看详情</button></span>
                    </p>
                    </a>
                    `
                    
                goods.append(div);

                });
            },
            error: function(){
                goods.innerHTML = '不好意思，获取热销商品失败了，请稍后重试'
            }
         });
    }


    //获取新品
    function getNewGoods(){
        let goods2 = document.querySelector(".goods2");

        $.ajax({
            type: "GET",
            url: "wx/goods/list",
            data: "isNew=true",
            success: function(res){
                let data = res.data.list;
                data.forEach((item, index) => {
                    let div = document.createElement("div");
                    div.className = 'card-box';
                    div.innerHTML = `
                    <a onclick="location.assign('/details.html?goodsId=${item.id}')" href='javascript:;' id=${item.goodsId} class='card'>
                    <img src=${item.picUrl}  />
                    <p  class='good-name'>
                          ${item.name} 
                    </p>
                    <p  class='good-price'>
                          <span>￥${item.retailPrice}</span>
                          <span><button class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal">查看详情</button></span>
                    </p>
                    </a>
                    `
                goods2.append(div);

                });
            },
            error: function(){
                goods.innerHTML = '不好意思，获取最新商品失败了，请稍后重试'
            }
         });
    }


    //layui的流动加载组件
    // flow.load({
    //   elem: '#content' //指定列表容器
    //   ,mb:100
    //   ,isAuto:true
    //   ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
    //   var lis = [];

    // //开局一个ajax请求获取商品信息
    // $.ajax({
    //     type: "GET",
    //     url: '/goods/getGoods?p='+page,
    //     success: function(res){
    //       let list = res.data.goods.list;
    //       //假设你的列表返回在data集合中
    //       layui.each(list, function(index, item){
            
    //         //注意下面第3行中onclick事件里的js
    //         lis.push(
    //           `<div class='card-box'>
    //           <a onclick="location.assign('/details.html?goodsId=${item.goodsId}')" href='javascript:;' id=${item.goodsId} class='card'>
    //           <img src=${item.goodsImageUrl}  />
    //           <p  class='good-name'>
    //                 <span>${item.goodsChName}</span>
    //                 <span>${item.goodsEnName}</span>
    //           </p>
    //           <p  class='good-price'>
    //                 <span>¥${item.goodsPrice}</span>
    //                 <span><button class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal">查看详情</button></span>
    //           </p>
    //           </a>
    //           </div>`);
    //       }); 
    //       //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
    //       //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
    //       next(lis.join(''), page < res.data.goods.pages);    
    //     },
    //     error:function(){
    //         // 获取失败友情提示
    //         $('.layui-flow-more').hide();
    //         error.show();
    //     }
    //  });
    //   }
    // });




});
