/** 
 * @file
 * @description 公共组件注册文件 
 */

import {Dialog,Switch,Pagination,MessageBox, Button, Input, Table,TableColumn, Tree ,Form, FormItem, Menu,MenuItem,MenuItemGroup,Submenu,Result,Breadcrumb,BreadcrumbItem, Message} from "element-ui";
import {confirm} from "uti/common";
// import {MyConfirm} from "com/MyConfirm";
import {myConfirm} from "com/MyConfirm/index.js";


export default{
    install(Vue){
        // Vue.component(MyConfirm.name,MyConfirm);
        Vue.prototype.$myConfirm=myConfirm;
        Vue.prototype.$mb=MessageBox;
        Vue.prototype.$m=Message;
        Vue.prototype.$confirm=confirm;
       [Dialog,Switch,Pagination,Button, Input, Table,TableColumn, Tree, Form, FormItem, Menu,MenuItem,MenuItemGroup,Submenu,Result,Breadcrumb,BreadcrumbItem].forEach(item=>Vue.use(item));
    }
}
