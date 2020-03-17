//layui模块的使用
layui.use(['jquery', 'laypage'],function(args){
    let $ = layui.jquery;
    var laypage = layui.laypage;
    var flag = 1;

    // var search = window.location.search.split("");
    // console.log(search);
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
    // let value = search.splice(varIndex + 1, search.length - 1);
    // console.log(key);
    // console.log(search.splice(varIndex + 1, search.length - 1));    


    // search.splice(0, 9);

    // keyword = search.join("");

    // 调用获搜索结果函数
    getList(1);

    function getList(index){
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
        key = key.join("");
        value = value.join("");
        console.log(key);
        console.log(value);
         //解决办法:将解码方式unscape换为decodeURI
        //原因:浏览器会将url中的中文参数进行encodeURI编码，所以要通过js使用decodeURI进行解码
        let data = {
            [key]:decodeURI(value),
            page : index,
        };
        console.log(data);
        console.log(":)")
        $.ajax({
            url: `/wx/goods/list`,
            type: 'GET',
            // dataType: 'json',
            // data: JSON.stringify(data),
            // data:`${key}=${value}`,
            data,
            cache: false,
            headers: { 
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
                'Content-Type': 'application/json',  //application/x-www-form-urlencoded  application/json
                // 'X-Litemall-Token': accountToken
            },      
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


                list.forEach((item, index) => {
                    let a = document.createElement("a");
                    a.className = 'search-item';
                    a.href = `/details.html?goodsId=${item.id}`
                    // 
                    a.innerHTML = `
                    <div class="search-item-img">
                    <img src=${item.picUrl}>
                    </div>
                    <div class="search-item-name">
                        <p>${item.name}</p>
                    </div>
                    `
                    searchBox.append(a);
                });

                if(index === 1){
                    console.log(index);
                    console.log("::::::")
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
                                let searchItem = document.querySelectorAll(".search-item");
                                searchItem.forEach((item, index) => {
                                    searchBox.removeChild(item);
                                })
                                console.log(obj.curr);
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