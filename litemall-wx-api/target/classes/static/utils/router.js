// 原生js实现哈希路由跳转，虽然很鸡肋....
class Router{
    constructor(){
        this.routers = {};
        window.addEventListener("hashchange", this.load.bind(this), false);
    }
    registerIndex(callback){
        this.routers.index = callback;
    }

    registerError(callback){
        this.routers.error = callback;
    }

    register(hash, callback){
        this.routers[hash] = callback;
    }

    load(){
        let hash = window.location.hash.slice(1);
        if(!hash){
            //index的情况
            this.routers.index();
        }else if(Object.keys(this.routers).indexOf(hash) !== -1){
            //正常哈希路由跳转的情况
            this.routers[hash]();
        }else{
            //错误页面跳转的情况
            this.routers.error();
        }
    }
}