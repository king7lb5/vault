/** 
 * @file
 * @description 公共库
 */

import { MessageBox } from "element-ui"

/**
 * @method
 * @description 询问方法
 * @param {String} Message 提示的内容
 * @param {string} title  提示的标题
 */

export const confirm=(message,title="提示")=>{
   return new Promise((resolve,reject)=>{
      MessageBox.confirm(message,title,{
        callback(action){
            switch(action){
                case "confirm":
                    resolve();
                    break;
                case "cancel":
                    reject();
                    break;
            }
        }
      });
   });
}