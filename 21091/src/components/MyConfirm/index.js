import MyConfirm from './index.vue';
import Vue from 'vue';
const myConfirmInstance = Vue.extend(MyConfirm);

/**
 * @method
 * @description 我的confirm
 * @param {String} message 我的confirm
 * @param {String} title 标题
 */
export const myConfirm = (message, title = '提示') => {
    return new Promise((resolve, reject) => {
        const obj = new myConfirmInstance({ propsData: { message, title } });
        /**
         * 取消
         */
        const cancel = () => {
            obj.$off('cancel', cancel);
            reject();
        }
        /**
         * 确定
         */
        const ok = () => {
            obj.$off('ok', ok);
            resolve(obj.close);
        }
        obj.$on('cancel', cancel);
        obj.$on('ok', ok);
        document.body.appendChild(obj.$mount().$el);
    });
}