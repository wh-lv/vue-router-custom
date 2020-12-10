/**
 * vue-router源码实现
 * 1. 生成 path 为 key，component 为 value的键值对对象
 * 2. 事项 router-link 和 router-view 组件
 * 3. 监听 url 的变化，将当前的 path 值赋予 current，current为响应式
 * 4. 
 */

let Vue;

class VueRouter {
    constructor (options) {
        this.$options = options;
    }
    
}

// 将 VueRouter 作为一个组件
VueRouter.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate () {
            if (this.$options.router) {
                this.$options.$router = this.$options.router
            }
        }
    })
}

export default VueRouter