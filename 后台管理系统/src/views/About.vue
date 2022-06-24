<template>
	<div class="loginbox">
		<el-container>
			<el-header>
				<div class="header">
					<div>电商后台管理系统</div>
					<!-- <div>后台管理系统</div> -->
					<div>
						<el-button type="primary" @click="open">退出</el-button>
					</div>
				</div>
			</el-header>
			<el-container>
				<el-aside :width="isc ? '60px' : '200px'">
					<div @click="isc=!isc">|||</div>
					<!-- <el-row class="tac"> -->
					<el-col>
						<el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64"
							text-color="#fff" active-text-color="#ffd04b" unique-opened :collapse="isc"
							:collapse-transition='false' router>
							<el-submenu :index="item1.id + ''" v-for="item1 in list" :key="item1.id">
								<template slot="title">
									<i class="el-icon-s-custom"></i>
									<span>{{ item1.authName }}</span>
								</template>

								<el-menu-item :index="'/' + item2.path" v-for="item2 in item1.children" :key="item2.id">
									<i class="el-icon-setting"></i>
									<span slot="title">{{ item2.authName }}</span>
								</el-menu-item>
							</el-submenu>
						</el-menu>
					</el-col>
					<!-- </el-row> -->
				</el-aside>
				<el-main>
					<router-view>
					</router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import {
		getMenusApi
	} from "@/http/api";
	export default {
		data() {
			return {
				list: [],
				isc: false
			};
		},
		mounted() {},
		created() {
			this.getMenus();
		},
		methods: {
			async getMenus() {
				const res = await getMenusApi();
				// console.log("res:", res);
				this.list = res;
			},
			open() {
				sessionStorage.removeItem('token')
				this.$router.push("/");
			}
		},
		components: {},
	};
</script>

<style lang='scss' scoped>
	.loginbox {
		width: 100%;
		height: 100%;
	}

	.isc {
		text-align: center;
	}

	.el-header,
	.el-footer {
		background-color: #545c64;
		color: white;
		font-weight: bold;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #545c64;
		color: white;
		text-align: center;
		// height: 100vh;
	}

	.el-container {
		height: 100%;
	}

	.el-main {
		background-color: #e9eef3;
		color: #333;
		// text-align: center;
		line-height: 60px;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.el-menu {
		border: none;
	}
</style>
