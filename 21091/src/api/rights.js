/**
 * @file
 * @description 权限模块接口文件
 */

import request from "./request";

/**
 * @file
 * @description 获取所以菜单
 */
export const getMenus=()=>request.get("menus");