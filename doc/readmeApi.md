####  商城api文档

####  账号登录
url：  `/wx/auth/login`
请求方式：POST  

参数列表：
   
    @param username
    @param password
#### 账号退出
url：`/wx/auth/logout`

请求方式：POST  

参数列表：
   
    @param username
    @param password
 
#### 账号信息
url：`/wx/auth/info`

请求方式：GET  

参数列表： 无

####  微信登录
url：  `/wx/auth/login_by_weixin`

请求方式：POST  

参数列表：
   
        @param wxLoginInfo
        @param request   
        
####  请求注册验证码
url：  `/wx/auth/regCaptcha`

请求方式：POST  

参数列表：
   
    @param body

#### 账号注册
url： `/wx/auth/register`

请求方式：POST

参数列表：
   
    @param body
    @param request

#### 请求验证码
url： `/wx/auth/captcha`

请求方式：POST

参数列表：
   
    @param body
    @param userId

#### 账号密码重置
url： `/wx/auth/reset`

请求方式：POST

参数列表：
   
    @param body
    @param request

#### 账号手机号码重置
url： `/wx/auth/resetPhone`

请求方式：POST

参数列表：
   
    @param body
    @param request
    @param userId

#### 账号信息更新
url： `/wx/auth/profile`

请求方式：POST

参数列表：
   
    @param body
    @param request
    @param userId
    
#### 微信手机号码绑定
url： `/wx/auth/bindPhone`

请求方式：POST

参数列表：
   
    @param body
    @param userId    
    
#### 首页数据
url： `/wx/home/index`

请求方式：GET

参数列表：无 
    
#### 商城信息介绍
url： `/wx/home/about`

请求方式：GET

参数列表：无 

#### 商品详情
url： `/wx/goods/detail`

请求方式：GET

参数列表：

    @param body
    @param userId    
        
#### 商品分类类目
url： `/wx/goods/category`

请求方式：GET

参数列表：

    @param id  
    
#### 根据条件搜素商品
url： `/wx/goods/list`

请求方式：GET

参数列表：

      @param categoryId 分类类目ID，可选
   	  @param brandId    品牌商ID，可选
   	  @param keyword    关键字，可选
   	  @param isNew      是否新品，可选
   	  @param isHot      是否热买，可选
   	  @param userId     用户ID
   	  @param page       分页页数
   	  @param limit       分页大小
   	  @param sort       排序方式，支持"add_time", "retail_price"或"name"
   	  @param order      排序类型，顺序或者降序

#### 商品详情页面推荐商品
url： `/wx/goods/related`

请求方式：GET

参数列表：

    @param id, 商品ID
 
 #### 在售的商品总数
 url： `/wx/goods/count`
 
 请求方式：GET
 
 参数列表：无 
 
  #### 订单列表
  url： `/wx/order/list`
  
  请求方式：GET
  
  参数列表： 
  
     @param userId   用户ID
     @param showType 订单信息
     @param page     分页页数
     @param limit     分页大小
     @param sort      排序
     @param order     订单
     
  #### 订单详情
  url： `/wx/order/detail`
  
  请求方式：GET
  
  参数列表：
  
     @param userId  用户ID
     @param orderId 订单ID    

  #### 提交订单
  url： `/wx/order/submit`
  
  请求方式：POST
  
  参数列表：
  
     @param userId 用户ID
     @param body   订单信息    
 
   #### 取消订单
   url： `/wx/order/cancel`
   
   请求方式：POST
   
   参数列表：
   
     @param userId 用户ID
     @param body   订单信息    
     
   #### 付款订单的预支付会话标识
   url： `/wx/order/prepay`
   
   请求方式：POST
   
   参数列表：
   
     @param userId 用户ID
     @param body   订单信息 
     @param request 
     
   #### 微信H5支付
   url： `/wx/order/h5pay`
   
   请求方式：POST
   
   参数列表：
   
     @param userId 用户ID
     @param body   订单信息 
     @param request 
     
   #### 微信付款成功或失败回调接口
   url： `/wx/order/pay-notify`
   
   请求方式：POST
   
   参数列表：
   
      @param request 请求内容
      @param response 响应内容
      
   #### 订单申请退款
   url： `/wx/order/refund`
   
   请求方式：POST
   
   参数列表：
   
       @param userId 用户ID
       @param body   订单信息 
       
   #### 确认收货
   url： `/wx/order/confirm`
   
   请求方式：POST
   
   参数列表：
   
       @param userId 用户ID
       @param body   订单信息 
       
   #### 删除订单
   url： `/wx/order/delete`
   
   请求方式：POST
   
   参数列表：
   
       @param userId 用户ID
       @param body   订单信息 
       
   #### 待评价订单商品信息
   url： `/wx/order/goods`
   
   请求方式：POST
   
   参数列表：
   
      @param userId  用户ID
      @param orderId 订单ID
      @param goodsId 商品ID 
      
   #### 评价订单商品
   url： `/wx/order/comment`
   
   请求方式：POST
   
   参数列表：
   
      @param userId 用户ID
      @param body   订单信息 
      
#### 用户收货地址服务
   #### 用户收货地址列表
   url： `/wx/address/list`
   
   请求方式：GET
   
   参数列表：
   
      @param userId 用户ID

   #### 收货地址详情
   url： `/wx/address/detail`
   
   请求方式：GET
   
   参数列表：
   
      @param userId 用户ID
      @param id     收货地址ID
      
   #### 添加或更新收货地址
   url： `/wx/address/save`
   
   请求方式：GET
   
   参数列表：
   
     @param userId  用户ID
     @param address 用户收货地址
     
   #### 删除收货地址
   url： `/wx/address/delete`
   
   请求方式：GET
   
   参数列表：
   
     @param userId  用户ID
     @param address 用户收货地址
     
####品牌商服务
   #### 品牌商列表
   url： `/wx/brand/list`
   
   请求方式：GET
   
   参数列表：
   
      @param page 分页页数
      @param limit 分页大小
      @param sort 排序字段
      @param order 升序字段
     
   #### 品牌详情
   url： `/wx/brand/detail`
   
   请求方式：GET
   
   参数列表：
   
     @param id 品牌ID
       
####用户收藏服务
   #### 用户收藏列表
   url： `/wx/collect/list`
   
   请求方式：GET
   
   参数列表：
   
      @param userId 用户ID
      @param type   类型，如果是0则是商品收藏，如果是1则是专题收藏
      @param page   分页页数
      @param limit   分页大小
      @param sort 排序字段
      @param order 升序字段
 
   #### 用户收藏添加或删除
   url： `/wx/collect/addordelete`
   
   请求方式：POST
   
   参数列表：
   
       @param userId 用户ID
       @param body   请求内容
       
####用户评论服务
   #### 发表评论
   url： `/wx/comment/post`
   
   请求方式：POST
   
   参数列表：
   
       @param userId  用户ID
       @param comment 评论内容
       
   #### 评论数量
   url： `/wx/comment/count`
   
   请求方式：GET
   
   参数列表：
   
       @param type   类型ID。 如果是0，则查询商品评论；如果是1，则查询专题评论。
       @param valueId 商品或专题ID。如果type是0，则是商品ID；如果type是1，则是专题ID。

   #### 评论列表
   url： `/wx/comment/list`
   
   请求方式：GET
   
   参数列表：
   
       @param type     类型ID。 如果是0，则查询商品评论；如果是1，则查询专题评论。
       @param valueId  商品或专题ID。如果type是0，则是商品ID；如果type是1，则是专题ID。
       @param showType 显示类型。如果是0，则查询全部；如果是1，则查询有图片的评论。
       @param page     分页页数
       @param limit     分页大小
       
####优惠券服务
 #### 优惠券列表
   url： `/wx/coupon/list`
   
   请求方式：GET
   
   参数列表：
   
        @param page 分页页数
        @param limit 分页大小
        @param sort 排序字段
        @param order 升序字段
 
  #### 个人优惠券列表
   url： `/wx/coupon/mylist`
    
   请求方式：GET
    
   参数列表：
    
         @param userId
         @param status
         @param page
         @param limit
         @param sort
         @param order

 #### 当前购物车下单商品订单可用优惠券
   url： `/wx/coupon/selectlist`
   
   请求方式：GET
   
   参数列表：
   
        @param userId
        @param cartId
        @param grouponRulesId
        
 #### 优惠券领取
   url： `/wx/coupon/receive`
   
   请求方式：POST
   
   参数列表：
   
        @param userId 用户ID
        @param body 请求内容， { couponId: xxx }
        
 #### 优惠券兑换
   url： `/wx/coupon/exchange`
   
   请求方式：POST
   
   参数列表：
   
         @param userId 用户ID
         @param body 请求内容， { code: xxx }
         
 #### 用户访问足迹服务
 ####删除用户足迹
   url： `/wx/footprint/delete`
   
   请求方式：POST
   
   参数列表：
   
          @param userId 用户ID
          @param body   请求内容， { id: xxx }
         
   ####用户足迹列表
  url： `/wx/footprint/list`
     
  请求方式：POST
     
   参数列表：
     
             @param page 分页页数
             @param limit 分页大小
             @param userId  
####帮助列表             
 url： `/wx/issue/list`
      
  请求方式：GET   
  
   参数列表：
      
               page: 请求页码
               limit: 每一页数量
               sort: 排序字段
               order: 升序降序 
####专题服务   
   ####专题列表          
 url： `/wx/topic/list`
      
  请求方式：GET   
  
   参数列表：
      
               page: 请求页码
               limit: 每一页数量
               sort: 排序字段
               order: 升序降序 
   ####专题详情          
 url： `/wx/topic/detail`
      
  请求方式：GET   
  
   参数列表：
      
      @param id 专题ID                   
   ####相关专题          
 url： `/wx/topic/related`
      
  请求方式：GET   
  
   参数列表：
      
      @param id 专题ID                  

   ###用户服务 
   ####用户个人页面数据         
 url： `/wx/user/index`
      
  请求方式：GET   
  
   参数列表：
      
       @param userId 用户ID                 
    
   ####对象存储服务         
 url： `/wx/storage/upload`
      
  请求方式：POST   
  
   参数列表：
      
       @param file 文件       
       
   ####访问存储对象         
 url： `/wx/storage/fetch/{key:.+}`
      
  请求方式：GET   
  
   参数列表：
      
       @param key 存储对象key                    
   ####访问存储对象         
 url： `/wx/storage/download/{key:.+}`
      
  请求方式：GET   
  
   参数列表：
      
       @param key 存储对象key          
       
   ####商品搜索服务         
 url： `/wx/search/index`
      
  请求方式：GET   
  
   参数列表：
      
       @param userId 用户ID，可选       
       
   ####关键字提醒         
 url： `/wx/search/helper`
      
  请求方式：GET   
  
   参数列表：
      
       @param keyword 关键字  
       @param page: 请求页码
       @param limit: 每一页数量               
       
   ####清除用户搜索历史         
 url： `/wx/search/clearhistory`
      
  请求方式：POST   
  
   参数列表：
      
       @param userId 用户ID         
       
   ####意见反馈服务  
   ####添加意见反馈       
 url： `/wx/feedback/submit`
      
  请求方式：POST   
  
   参数列表：
      
       @param userId   用户ID
       @param feedback 意见反馈 
       
   ###类目服务  
   ####所有一级分类目录       
 url： `/wx/catalog/getfirstcategory`
      
  请求方式：GET   
  
   参数列表：无      
     
   ####所有二级分类目录       
 url： `/wx/catalog/getsecondcategory`
      
  请求方式：GET   
  
   参数列表：无    
   
####分类详情       
 url： `/wx/catalog/index`
         
   请求方式：GET   
     
   参数列表：
      
      @param id   分类类目ID。   
      
####所有分类数据       
 url： `/wx/catalog/all`
         
   请求方式：GET   
     
   参数列表：
      
      无     
      
####当前分类栏目       
 url： `/wx/catalog/current`
         
   请求方式：GET   
     
   参数列表：
      
      @param id 分类类目ID     
      
####用户购物车服务
####用户购物车信息       
 url： `/wx/cart/index`
         
   请求方式：GET   
     
   参数列表：
      
       @param userId 用户ID  
       
####加入商品到购物车       
 url： `/wx/cart/add`
         
   请求方式：POST   
     
   参数列表：
      
        @param userId 用户ID
        @param cart   购物车商品信息， { goodsId: xxx, productId: xxx, number: xxx }
      
####立即购买       
 url： `/wx/cart/fastadd`
         
   请求方式：POST   
     
   参数列表：
      
        @param userId 用户ID
        @param cart   购物车商品信息， { goodsId: xxx, productId: xxx, number: xxx }
            
 ####修改购物车商品货品数量       
  url： `/wx/cart/update`
          
  请求方式：POST   
      
  参数列表：
       
         @param userId 用户ID
         @param cart   购物车商品信息， { id: xxx, goodsId: xxx, productId: xxx, number: xxx }
              
 ####购物车商品货品勾选状态       
  url： `/wx/cart/checked`
          
  请求方式：POST   
      
  参数列表：
       
        @param userId 用户ID
        @param body   购物车商品信息， { productIds: xxx, isChecked: 1/0 }   
        
####购物车商品删除       
  url： `/wx/cart/delete`
          
  请求方式：POST   
      
  参数列表：
       
        @param userId 用户ID
        @param body   购物车商品信息， { productIds: xxx }       
     
####购物车商品货品数量       
  url： `/wx/cart/goodscount`
          
  请求方式：GET   
      
  参数列表：
       
        @param userId 用户ID  
        
####购物车下单       
  url： `/wx/cart/checkout`
          
  请求方式：GET   
      
  参数列表：
       
        @param userId    用户ID
        @param cartId    购物车商品ID：
            如果购物车商品ID是空，则下单当前用户所有购物车商品；
            如果购物车商品ID非空，则只下单当前购物车商品。
         @param addressId 收货地址ID：
            如果收货地址ID是空，则查询当前用户的默认地址。
         @param couponId  优惠券ID：
            如果优惠券ID是空，则自动选择合适的优惠券。
         @param  userCouponId 
         @param  grouponRulesId 