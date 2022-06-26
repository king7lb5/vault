<template>
    <div>
       <div class="deng">
            <el-input v-model="queryModel.query" placeholder="请输入内容">
                 <el-button :loaing="queryLoaing"  @click="queryModel.pagenum=1;getUserList()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" @click="model={};visible=true">添加用户</el-button>
        </div>
        <!-- 表格 -->
        <el-table row-key="id" border :data="arr">
             <el-table-column label="#" type="index"></el-table-column>
             <el-table-column label="姓名" prop="username"></el-table-column>
             <el-table-column label="邮箱" prop="email"></el-table-column>
             <el-table-column label="手机" prop="mobile"></el-table-column>
             <el-table-column label="角色" prop="role_name"></el-table-column>
             <el-table-column label="状态" prop="mg_state">
                <template v-slot="{row}">
                      <el-switch @change="switchState(row)" v-model="row.mg_state"></el-switch>
                </template>
             </el-table-column>
             <el-table-column label="操作" width="300px" align="center">
               <template v-slot="{row}">
                    <el-button class="el-icon-edit" type="primary" size="mini" @click="model={...row};visible=true"></el-button>
                    <el-button class="el-icon-delete-solid" type="danger" size="mini" @click="deleteUser(row)"></el-button>
                    <el-button class="el-icon-s-tools" type="warning" size="mini"></el-button>
               </template>
             </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-Pagination
            @size-change="
            (v)=>
            {queryModel.pagesize=v;
            getUserList();
            }
            "
            @current-change="v=>{
                queryModel.pagenum=v;
                getUserList();
            }"
            :current-page="queryModel.pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryModel.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-Pagination>
        <!-- 添加修改 -->
        <el-dialog :close-on-click-modal="false" :title="this.title+'用户'" :visible.sync="visible">
             <el-form label-width="70px" :model="model" :rules="rules" ref="form">
                <el-form-item label="用户名" prop="username">
                    <el-input :disabled="!!model.id" v-model="model.username" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item v-if="!model.id" label="密码" prop="password">
                    <el-input type="password" v-model="model.password" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="model.email" :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="model.mobile" :maxlength="11"></el-input>
                </el-form-item>
             </el-form>
             <div slot="footer">
                <el-button @click="visible=false">取消</el-button>
                <el-button type="primary" :loading="confirmLoaing" @click="confirm">确定</el-button>
             </div>
        </el-dialog>
        <!-- 删除弹框 -->
        <!-- <MyConfirm title="测试标题" message="提示消息"/> -->
    </div>
</template>

<script>
import {getUsers,changeState,addUser,updataUser,delUser} from "api/user"
    export default {
        name:"users",
        data() {
            return {
                /**
                 * 数据列表
                 */
                arr:[],
                /**
                 * 弹出框是否显示
                 */
                visible:false,
                /**
                 * 查询loading
                 */
                queryLoaing:false,
                /**
                 * 提交loaing
                 */
                confirmLoaing:false,
                 /**
                  * 添加修改模型
                  */
                model:{},
                /**
                 * 规则
                 */
                rules:{
                    username:[
                        {required:true,message:"用户名不能为空"},
                        {min:3,max:10,message:"用户名长度为3~10位"},
                    ],
                    password:[
                        {required:true,message:"密码不能为空"},
                        {min:6,max:15,message:"密码长度为6~15位"},
                    ],
                    email:[
                        {required:true,message:"邮箱不能为空"},
                        {type:"email",message:"邮箱格式不对"},
                    ],
                    mobile:[
                        {required:true,message:"手机不能为空"},
                        {pattern:/^1[3-9]\d{9}$/,message:"手机格式不对"},
                    ],
                },
                /**
                 * 总条数
                 */ 
                total:0,
                /** 
                 * 查询模型
                */
               queryModel:{
                 query:"",
                 pagenum:1,
                 pagesize:4,
               }
            }
        },
        created () {
            this.getUserList();
        },
        methods: {
            /**
             * 删除用户
             */
            async deleteUser({id,username}){
              let res;
              try {
                res=await this.$myConfirm(`你确定要删除【${username}】吗？`);
                await delUser(id);
                this.$m.success("删除成功");
                this.getUserList();
              } catch (error) {
                console.log(error);
              }
              res&&res();
            },
            /* 添加 */
            async confirm(){
                console.log(123);
               try {
                  await this.$refs.form.validate();
                  await (this.model.id?updataUser:addUser)(this.model);
                  this.confirmLoaing=true;
                  this.visible=false;
                  this.$m.success(this.title+"成功");
                  this.getUserList();
               } catch (error) {}
               this.confirmLoaing=false;
            },
            /* 状态 */
            async switchState({id,mg_state}){
                try{
                   await changeState(id,mg_state);
                   this.$m.success("状态变更成功")
                   getUserList()
                }catch (error){}
            },
            async getUserList() {
                try{
                    this.queryLoaing=true;
                   const {total,users}=await getUsers(this.queryModel);
                   this.total=total;
                   this.arr=users;
                   console.log(this.arr);
                }catch (error){}
                this.queryLoaing=false;
            }
        },
        computed: {
            title() {
                return this.model.id?"修改":"添加"
            }
        },
    }   
</script>

<style scoped lang="scss">
.deng{
    display: flex;
    width: 300px;
    margin-left: 20px;
}
</style>