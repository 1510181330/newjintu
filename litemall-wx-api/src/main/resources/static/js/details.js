//一般直接写在一个js文件中
layui.use(['jquery','layer'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var search = window.location.search.split("");
    var detailImg = document.querySelector(".detailImg");
    // var detailPrice = document.querySelector(".banner-right-txt1-price");
    var detailName = document.querySelector(".banner-right-txt1-name");
    var infoTableTd = document.querySelectorAll(".info-table-td");
    var brand = document.querySelector(".banner-right-brand-box p");
    var cas = document.querySelector(".banner-right-cas-box p");
    var table = document.querySelector(".layui-table");
    var recommendContainer = document.querySelector(".recommend-container");
    // var recommendGood = document.querySelectorAll(".recommend-good");
    // var recommendGoodPrice = document.querySelectorAll(".recommend-good-price");
    // var recommendGoodName = document.querySelectorAll(".recommend-good-name");
    // var recommendBtn = document.querySelector(".recommend-refresh-btn");
    var recommendGoodImg = document.querySelectorAll(".recommend-good-img");
    search.splice(0, 9);
    search = search.join("");

    //根据good id获取商品信息函数
    getGoods(search);



                // 调用添加至购物车函数放在了getGoods函数的success函数中执行
                //addCart();



    //随机获取推荐商品函数放在了getGoods函数的success函数中执行
    // getGoodsRandom();

    //调用规定商品数量input输入格式检查函数放在了getGoods函数的success函数中执行
    // inputHandle();



    //根据goodsId获取商品详情函数
    function getGoods(search) {
        $.ajax({
            type: "GET",
            url: "/wx/goods/detail",
            data: `id=${search}`,
            success: function (res) {
                const {
                    id,
                    name,
                    goodsSn,
                    unit,
                    counterPrice,
                    retailPrice,
                    categoryId,
                    keywords,
                    brief,
                    picUrl
                } = res.data.info;
                console.log(res);
                let brandName;
                res.data.brand ? brandName = res.data.brand.name : brandName = ''
                const {productList} = res.data;
                console.log(productList)
                //新城参数数组，该数组元素顺序需要和html中的InfoTable的顺序一致
                // const infoArr = [
                //     goodsEnName,
                //     goodsTrivialName,
                //     goodsMolecularFormula,
                //     goodsForm,
                //     goodsUnit,
                //     goodsCondition
                // ]
                //填充商品价格,名称，图片
                // detailPrice.innerHTML = '￥' + goodsInitPrice;
                detailName.innerHTML = name;
                brand.innerHTML = "品牌:" + brandName;
                cas.innerHTML = "CAS号：" + brief;
                detailImg.src = picUrl;
                // detailImg.src = "https://thumbs.nosto.com/quick/zp8dm726/8/111127/ee661f5fbe5ea20ca797561c7b64389fe131343d449a901969cff70250215caca/A";
                //填充商品详细参数：英文名、俗名、化学方程式、形态、单位、存储条件
                // infoArr.forEach((item, index) => {
                //     let tr = document.createElement("tr");
                //     let td1 = document.createElement("td1");
                //     let td2 = document.createElement("td2");
                // })
                console.log(categoryId);
                //通过商品类别来对info的table进行分类填充
                switch(categoryId){
                    case 1005 :
                    case 1006 : {
                        // 分子试剂
                        let thead = document.createElement("thead");
                        let tbody = document.createElement("tbody");
                        thead.innerHTML = `
                        <tr>
                            <th>货号</th>
                            <th>规格</th>
                            <th>名称</th>
                            <th>包装</th>
                            <th>价格</th>
                            <th>数量</th>
                        </tr> `;
                        table.append(thead);
                        productList.forEach((item, index) => {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                                <td>${goodsSn}</td>
                                <td>${item.specifications[0]}</td>
                                <td>${name}</td>
                                <td>${unit}</td>
                                <td>${item.price}</td>
                                <td>
                                <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-sub-btn">
                                  -
                                </button>
                                <div class="layui-input-inline detail-good-input ">
                                  <input type="text" name="price_min" placeholder="" autocomplete="off" class="good-inumber-input detail-good-input goodCountInput layui-input" value=0>
                                </div>
                                  <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-add-btn">
                                    <!-- <i class="layui-icon">&#xe654;</i> -->
                                    +
                                  </button>
                              </td>
                            `
                            tbody.append(tr);
                            table.append(tbody);

                          //调用规定商品数量input输入格式检查函数放在了getGoods函数的success函数中执行
                            inputHandle(index);
                        });
                        break;
                    }
                    case 1007 :
                    case 1008 :
                    case 1009 : {
                        // 化学试剂
                        let thead = document.createElement("thead");
                        let tbody = document.createElement("tbody");
                        thead.innerHTML = `
                        <tr>
                            <th>货号</th>
                            <th>规格</th>
                            <th>品名</th>
                            <th>包装</th>
                            <th>价格</th>
                            <th>数量</th>
                        </tr> `;
                        table.append(thead);
                        productList.forEach((item, index) => {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                                <td>${goodsSn}</td>
                                <td>${item.specifications[0]}</td>
                                <td>${brandName}</td>
                                <td>${unit}</td>
                                <td>${item.price}</td>
                                <td>
                                <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-sub-btn">
                                  -
                                </button>
                                <div class="layui-input-inline detail-good-input">
                                  <input type="text" name="price_min" placeholder="" autocomplete="off" class="good-inumber-input detail-good-input goodCountInput layui-input" value=0>
                                </div>
                                  <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-add-btn">
                                    <!-- <i class="layui-icon">&#xe654;</i> -->
                                    +
                                  </button>
                              </td>
                            `
                            tbody.append(tr);
                            table.append(tbody);

                          //调用规定商品数量input输入格式检查函数放在了getGoods函数的success函数中执行
                            inputHandle(index);
                        });
                        break;
                    }
                    case 1010 :
                    case 1011 : {
                        // 实验耗材
                        let thead = document.createElement("thead");
                        let tbody = document.createElement("tbody");
                        thead.innerHTML = `
                        <tr>
                            <th>货号</th>
                            <th>规格</th>
                            <th>品名</th>
                            <th>包装</th>
                            <th>价格</th>
                            <th>数量</th>
                        </tr> `;
                        table.append(thead);
                        productList.forEach((item, index) => {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                                <td>${goodsSn}</td>
                                <td>${item.specifications[0]}</td>
                                <td>${brandName}</td>
                                <td>${unit}</td>
                                <td>${item.price}</td>
                                <td>
                                <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-sub-btn">
                                  -
                                </button>
                                <div class="layui-input-inline detail-good-input">
                                  <input type="text" name="price_min" placeholder="" autocomplete="off" class="good-inumber-input detail-good-input goodCountInput layui-input" value=0>
                                </div>
                                  <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-add-btn">
                                    <!-- <i class="layui-icon">&#xe654;</i> -->
                                    +
                                  </button>
                              </td>
                            `
                            tbody.append(tr);
                            table.append(tbody);

                          //调用规定商品数量input输入格式检查函数放在了getGoods函数的success函数中执行
                            inputHandle(index);
                        });
                        break;
                    }
                    case 1012 :
                    case 1013 :
                    case 1014 : {
                      console.log(":)");
                        // 化玻用品
                        let thead = document.createElement("thead");
                        let tbody = document.createElement("tbody");
                        thead.innerHTML = `
                        <tr>
                            <th>货号</th>
                            <th>规格</th>
                            <th>品名</th>
                            <th>包装</th>
                            <th>价格</th>
                            <th>数量</th>
                        </tr> `;
                        table.append(thead);
                        productList.forEach((item, index) => {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                                <td>${goodsSn}</td>
                                <td>${item.specifications[0]}</td>
                                <td>${brandName}</td>
                                <td>${unit}</td>
                                <td>${item.price}</td>
                                <td>
                                <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-sub-btn">
                                  -
                                </button>
                                <div class="layui-input-inline detail-good-input">
                                  <input type="text" name="price_min" placeholder="" autocomplete="off" class="good-inumber-input detail-good-input goodCountInput layui-input" value=0>
                                </div>
                                  <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-add-btn">
                                    <!-- <i class="layui-icon">&#xe654;</i> -->
                                    +
                                  </button>
                              </td>
                            `
                            tbody.append(tr);
                            table.append(tbody);

                          //调用规定商品数量input输入格式检查函数放在了getGoods函数的success函数中执行
                            inputHandle(index);
                        });
                        break;
                    }
                }

                // 化玻用品
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");
                thead.innerHTML = `
                <tr>
                    <th>货号</th>
                    <th>规格</th>
                    <th>品名</th>
                    <th>包装</th>
                    <th>价格</th>
                    <th>数量</th>
                </tr> `;
                table.append(thead);
                productList.forEach((item, index) => {
                    let tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${goodsSn}</td>
                        <td>${item.specifications[0]}</td>
                        <td>${brandName}</td>
                        <td>${unit}</td>
                        <td>${item.price}</td>
                        <td>
                        <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-sub-btn">
                          -
                        </button>
                        <div class="layui-input-inline detail-good-input">
                          <input type="text" name="price_min" placeholder="" autocomplete="off" class="good-inumber-input detail-good-input goodCountInput layui-input" value=0>
                        </div>
                          <button type="button" class="layui-btn layui-btn-sm layui-btn-primary detail-add-btn">
                            <!-- <i class="layui-icon">&#xe654;</i> -->
                            +
                          </button>
                      </td>
                    `
                    tbody.append(tr);
                    table.append(tbody);

                  //调用规定商品数量input输入格式检查函数放在了getGoods函数的success函数中执行
                    inputHandle(index);
                });

                // infoTableTd.forEach((item, index) => {
                //     item.innerHTML = infoArr[index];
                // })
                //随机获取推荐商品函数放在了getGoods函数的success函数中执行
                getGoodsRandom(id);

                // 调用添加至购物车函数放在了getGoods函数的success函数中执行
                addCart(productList);
            },
            error: function (res) {
                console.log(res);
            }
        })
    }

    //获取推荐商品函数`
    function getGoodsRandom(id) {
        // recommendBtn.onclick = getGoodsRandom;
        $.ajax({
            type: "GET",
            url: "/wx/goods/related",
            data:"id=" + id,
            success: function (res) {
                const {list} = res.data;
                list.forEach((item, index) => {
                    let div = document.createElement("div");
                    div.className = 'recommend-good';

                    div.innerHTML = `
                        <img class="recommend-good-img" src='${item.picUrl}' alt="">
                        <div class="recommend-good-info">
                        <div class="recommend-good-price">
                            ${item.counterPrice}
                        </div>
                        <div class="recommend-good-name">
                            ${item.name}
                        </div>
                        </div>
                    `
                    // recommendGoodName[index].innerHTML = item.name;
                    // recommendGoodPrice[index].innerHTML = item.counterPrice;
                    // recommendGoodImg[index].src = item.goodsImageUrl;
                    // recommendGoodImg[index].src = item.picUrl;

                    //顺势为每个recommendGood绑定单机跳转页面事件
                    div.onclick = function(){
                        location.assign(`/details.html?goodsId=${item.id}`);
                    }

                    recommendContainer.append(div);
                })
            },
            error: function (err) {
                console.log(err);
            }
        })
    }


    //规定商品数量输入的input的值只能为整数
    function inputHandle(index) {
        let subBtn = document.querySelectorAll(".detail-sub-btn");
        let addBtn = document.querySelectorAll(".detail-add-btn");
        let goodCountInput = document.querySelectorAll(".detail-good-input input");
        goodCountInput[index].onkeyup = function (event) {
            let inputValue = goodCountInput[index].value;
            if (isNaN(event.key) && event.key != 'Backspace') {
                //输入不是数字
                goodCountInput[index].value = inputValue;
            } else {
                inputValue = goodCountInput[index].value;
            }
        }
        subBtn[index].onclick = function () {
            goodCountInput[index].value >= 1 ? goodCountInput[index].value = goodCountInput[index].value - 1 : null;
        }
        addBtn[index].onclick = function () {
            goodCountInput[index].value = 1 * goodCountInput[index].value + 1
        }
    }

    //添加至购物车函数
    function addCart(list){
      let addBtn = document.querySelector(".add-to-cart-btn");
      let detailGoodInput = document.querySelectorAll(".good-inumber-input");

      addBtn.addEventListener("click", () => {

        // 未登录，跳转至login.html
        let accountToken;
        Cookies.get("X-Litemall-Token")
        ? 
        accountToken = Cookies.get("X-Litemall-Token")
        :
        window.location.href = '/login.html'

        let sum = 0;
        let arr = [];
        detailGoodInput.forEach((item, index) => {
          sum += item.value * 1;
          arr.push(item.value);
        })         
        console.log(sum);
        console.log(arr);
        console.log(list);
        if(sum){ 
          arr.forEach((item, index) => {
            // 当数组值不是0时，才发送添加购物车ajax
            item * 1 !== 0
            ?
            ajax(list,item * 1, index, accountToken)
            :
            null;
          })
        }else{
          //未选择商品
          console.log(list);
        }
      }, false);

      // 添加至购物车的ajax函数
      function ajax(list, number, index, accountToken){
        let data = {
          goodsId : list[index].goodsId,
          number,
          productId : list[index].id
        }
        console.log(data);
        $.ajax({
          url: '/wx/cart/add',
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
            layer.msg('添加成功');
          },
          error(){

          }
          });
      }
    } 
})