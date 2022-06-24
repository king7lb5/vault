<template>
	<div class="">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="mtop16">
			<div>
				<el-input placeholder="请输入内容" v-model="userinfo.query" class="input-with-select" @input="search">
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
				<el-button type="primary" class="left" @click="add">添加用户</el-button>
			</div>

			<el-table :data="tableData" border>
				<el-table-column align="center" type="index" label="#" width="80">
				</el-table-column>
				<el-table-column prop="username" label="姓名" height="80">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" height="80">
				</el-table-column>
				<el-table-column prop="mobile" label="电话"> </el-table-column>
				<el-table-column prop="role_name" label="角色" height="80">
				</el-table-column>
				<el-table-column prop="name" label="状态" height="80">
					<template slot-scope="scope">
						<div>
							<el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
								@change="state(scope.row)">
							</el-switch>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" height="80">
					<template slot-scope="scope">
						<div>
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="bg(scope.row)">
							</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="remove(scope.row.id)">
							</el-button>
							<el-button size="mini" type="warning" icon="el-icon-setting" @click="role(scope.row)">
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination class="mtop16" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="userinfo.pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="userinfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>
		<!-- 添加模态框 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
			<el-form :model="addUserData" :rules="addUserDataRules">
				<el-form-item prop="username" label="用户名">
					<el-input v-model="addUserData.username"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input v-model="addUserData.password"></el-input>
				</el-form-item>

				<el-form-item prop="email" label="邮箱">
					<el-input v-model="addUserData.email"></el-input>
				</el-form-item>

				<el-form-item prop="mobile" label="手机号">
					<el-input v-model="addUserData.mobile" maxlength="11" show-word-limit></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addsave">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改的模态框 -->
		<el-dialog title="编辑" :visible.sync="editss" width="30%">
			<el-form :model="edit" :rules="addUserDataRules">
				<el-form-item prop="username" label="用户名">
					<el-input v-model="edit.username" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item prop="email" label="邮箱">
					<el-input v-model="edit.email"></el-input>
				</el-form-item>

				<el-form-item prop="mobile" label="手机号">
					<el-input v-model="edit.mobile" maxlength="11" show-word-limit></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editss = false">取 消</el-button>
				<el-button type="primary" @click="bgadd">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 分类角色的模态框 -->
		<el-dialog title="分配角色" :visible.sync="roles" width="30%">
			<div>当前的用户：<span>{{roleData.username}}</span></div>
			<div>当前的角色：<span>{{roleData.juese}}</span></div>
			<el-select v-model="jsid" placeholder="请选择">
				<el-option v-for="item in values" :key="item.id" :label="item.roleName" :value="item.id"></el-option>

			</el-select>

			<span slot="footer" class="dialog-footer">
				<el-button @click="roles = false">取 消</el-button>
				<el-button type="primary" @click="jsqds">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import _ from "lodash";
	import {
		getUserListApi
	} from "@/http/api";
	import {
		getUserdelet
	} from "@/http/api";
	import {
		getUseradd
	} from "@/http/api";
	import {
		getbg
	} from "@/http/api";
	import {
		getstate
	} from "@/http/api";
	import {
		getrid,
		jsqd
	} from "@/http/api";

	export default {
		data() {
			let checkEmail = (rule, value, callback) => {
				console.log("rule:", rule);
				console.log("value:", value);
				//邮箱正则
				const reg =
					/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				//判断正则是否符合
				if (!reg.test(value)) {
					return callback(new Error("邮箱格式不正确，请检查"));
				}

				callback();
			};
			let checkMobile = (rule, value, callback) => {
				//写手机号正则
				const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				//判断正则是否符合
				if (!reg.test(value)) {
					return callback(new Error("手机号格式不正确，请检查"));
				}

				callback();
			};
			return {
				tableData: [],
				total: 0,
				dialogVisible: false,
				editss: false,
				roles: false,
				values: [],
				roleData: { //角色数据
				},
				jsid: '',
				yhid: '',
				edit: {
					//编辑
					username: "",
					password: "",
					email: "",
					mobile: "",
				},
				states: {
					//状态
					uid: "",
					type: "",
				},
				addUserData: {
					//添加
					username: "",
					password: "",
					email: "",
					mobile: "",
				},
				userinfo: {
					//分页
					queyr: "",
					pagenum: 1,
					pagesize: 2,
				},
				addUserDataRules: {
					//正则
					username: [{
							required: true,
							message: "请输入账号",
							trigger: "blur"
						},
						{
							min: 4,
							max: 10,
							message: "长度在 4 到 10 个字符",
							trigger: "blur",
						},
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 3,
							max: 5,
							message: "长度在 3 到 5 个字符",
							trigger: "blur"
						},
					],
					email: [{
							required: true,
							message: "请输入邮箱地址",
							trigger: "blur"
						},
						{
							validator: checkEmail,
							trigger: "blur"
						},
					],
					mobile: [{
							required: true,
							message: "请输入邮箱地址",
							trigger: "blur"
						},
						{
							validator: checkMobile,
							trigger: "blur"
						},
					],
				},
			};
		},
		mounted() {},
		created() {
			this.getUserList();
		},
		methods: {
			search: _.debounce(function() {
				this.getUserList();
			}, 2000),

			remove(id) {
				//删除
				getUserdelet(id).then((res) => {
					this.getUserList();
				});
			},
			add() {
				//添加模态框
				this.dialogVisible = true;
			},
			addsave() {
				//添加确定
				//addUserData;
				getUseradd(this.addUserData).then((res) => {
					this.getUserList();
				});
				this.addUserData = {
					username: "",
					password: "",
					email: "",
					mobile: ""
				};
				this.dialogVisible = false;
			},
			bgadd() {
				//编辑确定
				getbg(this.edit).then((res) => {
					this.getUserList();
				});
				this.editss = false;
			},
			bg(row) {
				//编辑模态框
				this.editss = true;
				this.edit.id = row.id;
				this.edit.username = row.username;
				this.edit.password = row.password;
				this.edit.email = row.email;
				this.edit.mobile = row.mobile;
			},
			state(row) {
				//状态修改
				console.log("状态:", row);
				this.states.uid = row.id;
				this.states.type = row.mg_state;
				getstate(this.states).then((res) => {
					this.getUserList();
				});
			},
			role(row) { //角色框
				this.yhid = row.id
				this.roleData.username = row.username
				this.roleData.juese = row.role_name
				this.roles = true
				getrid().then(res => {
					//  console.log(res);
					this.values = res
				})
				// this.roleData=row
				// this.rol=res
				// this.roles=true
			},
			jsqds() { //角色框确定
				console.log(this.yhid);
				console.log(this.jsid);
				jsqd(this.yhid, this.jsid).then(res => {
					this.getUserList()
				})
				this.roles = false
			},
			handleSizeChange(val) {
				this.userinfo.pagesize = val;
				this.getUserList();
			},
			handleCurrentChange(val) {
				this.userinfo.pagenum = val;
				this.getUserList();
			},
			async getUserList() {
				const res = await getUserListApi(this.userinfo);
				console.log("用户列表:", res);
				const {
					users,
					total
				} = res;
				this.tableData = users;
				this.total = total;
			},
		},
		components: {},
	};
</script>

<style lang='scss' scoped>
	/deep/.el-table .el-table__cell {
		text-align: center !important;
	}

	.input-with-select {
		width: 500px;
	}

	.left {
		margin-left: 25px;
	}
</style>
