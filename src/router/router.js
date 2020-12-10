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