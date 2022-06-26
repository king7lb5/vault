<template>
    <div class="wrapper">
        <header>
            <div class="left">
              <img src="../../src/assets/heima.b5a855ee.png" alt="">
              <span>
                {{title}}
              </span>
            </div>
            <el-button type="info" @click="exit">退出</el-button>
        </header>
        <section>
            <aside>
                <el-menu router background-color="#333744" text-color="#fff">
                    <el-submenu :index="item.id+''" v-for="item in menus" :key="item.id">
                        <template slot="title">
                           {{item.authName}}
                        </template>
                        <el-menu-item-group>
                            <el-menu-item :index="child.path" v-for="child in item.children" :key="child.id">
                                {{child.authName}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </aside>
            <main>
                <el-breadcrumb v-if="parent" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{parent}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{child}}</el-breadcrumb-item>
                 </el-breadcrumb>
                <div class="card">
                     <router-view></router-view>
                </div>
            </main>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name:"HomeLayout",
        data() {
            return {
                title: process.env.VUE_APP_TITLE,
                /**
                 * 父菜单
                 */
                parent:"",
                /**
                 * 子菜单
                 */
                child:"",  
            };
        },
        created () {
            this.findNames();
        },
        updated(){
            this.findNames();
        },
        methods: {
            /**
             * 退出
             */
           async exit(){
                try{
                    await this.$confirm("你确定要退出吗");
                    this.$store.dispatch("exit");
                }catch(error){};

            //    this.$mb.confirm("消息","标题",{
            //     beforeClone(action,instance,done){
            //         console.log(action,instance,done);
            //         done();
            //     }
            //    })
            },
            /**
             * 根据路径查找当前页面名称
             */
            findNames() {
                const path=this.$route.path.replace("/","");
                for(const parent of this.menus){
                    for(const child of parent.children){
                        if(child.path===path){
                           this.parent=parent.authName;
                           this.child=child.authName;
                           return;
                        }
                    }
                }
            }
        },
        computed: {
           ...mapState(["menus"])
        },
    }
</script>

<style scoped lang="scss">
 .wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    header{
        height: 60px;
        background: #373d41;
        flex-shrink: 0; //缩小比例
        display: flex;
        justify-content: space-between;
        align-items: center;
         padding-right: 20px;
        .left{
            display: flex;
            align-items: center;
            span{
                font-size: 20px;
                color: white;
                margin-left: 15px;
            }
        }
    }
    section{
        flex: 1;
        display: flex;
        overflow: hidden;
        aside{
            width: 200px;
            background: #333744;
            max-height: 100%;
            overflow: auto;
        }
        main{
            max-height: 100%;
            overflow: auto;
            flex: 1;
            background: white;
            box-sizing:border-box;
            padding:20px;
            ::v-deep .el-breadcrumb{
                font-size: 12px;
            }
            .card{
                margin-top: 15px;
                border-radius: 4px;
                border: 1px solid #ebeef5;
                background: white;
                box-shadow: 0 1px 1px rgba(0,0,0,0.5);
            }
        }
    }
 }
</style>