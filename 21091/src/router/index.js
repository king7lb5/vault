import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "view/user/login";
import HomeLayout from "@/layouts/HomeLayout";
import NotFound from "view/404";
import Welcome from "view/welcome";
import store from "store"
 
Vue.use(VueRouter)

const routes = [
   {
    name:"login",
    path:"/login",
    component: login
   },
   {
    name:"HomeLayout",
    path:"/",
    component: HomeLayout,
    redirect:"/welcome",
    children:[
      {
        name:"welcome",
        path:"/welcome",
        component:Welcome,
      },
      {
        name:"users",
        path:"/users",
        component:()=>import("view/mains/users")
      },
      {
        name:"404",
        path:"*",
        component:NotFound,
      },
    ]
   },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const token =store.getters.token;
  const islogin =to.name==="login";
  // 如果有token，并且是在登录页，那么跳转到首页
  if(token&&islogin){
      return next({name:"HomeLayout"});
  }
  // 如果没有token，并且不是在登录页，那么跳转到登录页
  if(!token&&!islogin){
    return next({name:"login"});
  }
  next()
})
export default router
