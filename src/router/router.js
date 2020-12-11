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
        this.routesMap = {};
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init () {
        this.initEvents()
        this.initRoutesMap(this.$options) 
        this.initView()
    }
    initEvents () {
        window.addEventListener('load', this.onHashChange.bind(this), false)
        window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    }
    initRoutesMap (options) {
        options.routes.forEach(item => {
            this.routesMap[item.path] = item
        })
    }
    initView () {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render (h) {
                return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
            }
        })
        Vue.component('router-view', {
            render: (h) => {
                return h(this.routesMap[this.app.current].component)
            }
        })
    }
    onHashChange () {
        this.app.current = window.location.hash.slice(1) || '/'
    }
    
}

// 将 VueRouter 作为一个组件
VueRouter.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate () {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}

export default VueRouter