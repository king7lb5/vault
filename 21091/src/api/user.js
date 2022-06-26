/** 
 * @file
 * @description 用户模块接口文件
*/

import request from "./request";

/** 
 * @method
 * @description 登录
 * @param {object} model 用户登录信息
*/
export const login=(model)=>request.post("login",model);
/**
 * @method
 * @description  获取用户
 * @param {Object} model   查询模型
 */
export const getUsers=(model)=>request.get("users",{params:model});

/**
 * @method
 * @description 
 * @param {number} id  用户id
 * @param {boolean} state 要修改的状态
 * @returns 
 */
export const changeState=(id,state)=>request.put(`users/${id}/state/${state}`);

/**
 * @method
 * @description 添加用户
 * @param {Object} model 要添加的用户对象
 * 
 */
export const addUser=(model)=>request.post("users",model);
/**
 * @method
 * @description 修改用户
 * @param {Object} model  要修改的用户信息
 */
export const updataUser=(model)=>request.put(`users/${model.id}`,model);

/**
 * @method
 * @description 删除用户
 * @param {Number} id  要删除的用户id
 * @returns 
 */
export const delUser=(id)=> request.delete("users/"+id)