<template>
    <div class="wrapper">
        <div class="box">
             <div class="biao">
                <img src="../../assets/logo.png" alt="">
             </div>
             <div class="form">
               <el-form ref="form" :model="model" :rules="rules">
                <!-- 用户名 -->
                 <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="model.username" :maxlength="10"></el-input>
                </el-form-item>
                <!-- 密码 -->
                 <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="model.password" :maxlength="15" type="password"></el-input>
                </el-form-item>
               </el-form>
               <div class="buttons">
                   <el-button type="primary" @click="userLogin">登录</el-button>
                   <el-button type="info" @click="reset">重置</el-button>
               </div>
             </div>
        </div>
    </div>
</template>

<script>
import { getMenus } from "api/rights";
import {login} from "api/user";
// import {}

    export default {
        name:"login",
        data() {
            return {
                /**
                 * 登录loading
                 */
                loading:false,
                /**
                 * 登录信息
                 */
                model:{
                    username:"",
                    password:""
                },
                /**
                 * 规则
                 */
                rules:{
                   username:[
                    {
                        required:true,
                        message:"用户名不能为空",
                    },
                    {
                        min:3,
                        max:10,
                        message:"用户名长度在 3 到 10 个字符"
                    },
                   ],
                   password:[
                    {
                        required:true,
                        message:"密码不能为空",
                    },
                    {
                        min:6,
                        max:15,
                        message:"密码长度在 6 到 15 个字符"
                    },
                   ],
                },
            }
        },
        methods: {
            /**
             * 用户登录
             */
            async userLogin(){
               try{
                  await this.$refs.form.validate();
                  this.loading = true;
                  const data=await login(this.model);
                  this.$store.commit("setUser",data);
                  const menus =await getMenus();
                  this.$store.commit("setMenus",menus);
                  this.$router.push({name:"HomeLayout"});
                  console.log(data);
               }catch(error){
                console.log(error)
               }
               this.loading=false;
            },
            /**
             * 重置
             */
            reset() {
                this.$refs.form.resetFields();
                this.model={};
            }
        },
    }
</script>

<style scoped lang="scss">
   .wrapper{
    height: 100%;
    background: var(--mainBackColor);
    position: relative;
   }
   .box{
    width: 450px;
    height: 300px;
    background: white;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%,-50%);

    // margin-left: -225px;
    // margin-top: -150px;
    .buttons{
      margin-left: 135px;
    }
     .form{
        box-sizing: border-box;
        width: 100%;
        position: absolute;
        bottom: 20px;
        padding: 0 20px;
    }
   }
  
   .biao{
    width: 130px;
    height: 130px;
    background: white;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 10px #ddd;
   }
   img{
    background: #eee;
    border-radius: 50%;
    width: 100%;
    height: 100%;
   }
</style>