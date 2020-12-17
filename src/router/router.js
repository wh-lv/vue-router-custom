/**
 * vue-router源码实现
 * 1. 解析 routes 配置，生成 path 为 key，component 为 value的键值对对象
 * 2. 实现全局组件：router-link 修改 hash，router-view 显示当前匹配组件
 * 3. 监听 url 的变化，将 hash 更新到当前路由 current
 * 4. 当前路由 current 为响应式，实现 router-view 的重新渲染
 */

let Vue;

class VueRouter {
    constructor (options) {
        this.$options = options;
        this.routesMap = {}
        this.app = new Vue({
            data () {
                return {
                    current: '/'
                }
            }
        })
    }

    init () {
        this.bindEvents()
        this.createRoutesMap(this.$options)
        this.initComponent()
    }
    
    bindEvents () {
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }

    onHashChange () {
        this.app.current = window.location.hash.slice(1) || '/'
    }

    createRoutesMap (options) {
        options.routes.forEach(item => {
            this.routesMap[item.path] = item
        })
    }

    initComponent () {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render (h) {
                return h('a', { attrs: { href: `#${this.to}` } }, this.$slots.default)
            }
        })
        Vue.component('router-view', {
            render: (h) => {
                const Comp = this.routesMap[this.app.current].component
                return h(Comp)
            }
        })
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