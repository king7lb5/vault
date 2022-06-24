<template>
	<div class="">
		<el-card class="mtop16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>商品列表</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- 头部提示添加商品信息 -->
			<el-alert center title="添加商品信息" type="info" :closable="false" show-icon class="mtop16">
			</el-alert>
			<!-- 步骤条 -->
			<el-steps :active="actives * 1" finish-status="success" :align-center="true" class="mtop16">
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step titlse="完成"></el-step>
			</el-steps>

			<el-form :model="addGoodsData" :rules="addrules" ref="add">
				<el-tabs v-model="actives" @tab-click="handleClick" tabPosition="left" class="mtop16"
					:before-leave="beforeLeave">
					<el-tab-pane label="基本信息" name="0">
						<el-form-item label="商品名称" prop="goods_name">
							<el-input v-model="addGoodsData.goods_name"></el-input>
						</el-form-item>

						<el-form-item label="商品价格" prop="goods_price">
							<el-input v-model="addGoodsData.goods_price"></el-input>
						</el-form-item>

						<el-form-item label="商品重量" prop="goods_weight">
							<el-input v-model="addGoodsData.goods_weight"></el-input>
						</el-form-item>

						<el-form-item label="商品数量" prop="goods_number">
							<el-input v-model="addGoodsData.goods_number"></el-input>
						</el-form-item>

						<el-cascader v-model="value" :options="options" :props="defaultProps" @change="handleChange">
						</el-cascader>
						<div>{{ shuju }}</div>
					</el-tab-pane>

					<el-tab-pane label="商品参数" name="1">
						<el-form-item v-for="item in checkList" :key="item.attr_id" :label="item.attr_name">
							<el-checkbox-group v-model="item.attr_vals">
								<el-checkbox v-for="(item2, index) in item.attr_vals" :key="index" :label="item2">
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-tab-pane>

					<el-tab-pane label="商品属性" name="2">
						<el-form-item label="商品属性">
							<br />

							<el-form-item :label="item.attr_name" v-for="item in checkLists" :key="item.attr_id">
								<el-input v-model="item.attr_vals"></el-input>
							</el-form-item>
						</el-form-item>
					</el-tab-pane>

					<el-tab-pane label="商品图片" name="3">
						<el-upload class="upload-demo" action="http://www.ysqorz.top:8888/api/private/v1/upload"
							:on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess"
							:headers="Headers" list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">
								只能上传jpg/png文件，且不超过500kb
							</div>
						</el-upload>
					</el-tab-pane>

					<el-tab-pane label="商品内容" name="4">
						<el-form-item label="商品内容">
							<quill-editor v-model="addGoodsData.goods_introduce"></quill-editor>
							<el-button class="mt16" type="primary" @click="addGoodsOk">添加商品</el-button>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import {
		getspfl,
		getMoveQuietList,
		addGoodsApi
	} from "@/http/api";
	import _ from "lodash";
	export default {
		data() {
			return {
				Headers: {
					Authorization: sessionStorage.getItem("token"),
				},
				actives: "0",
				addlist: {
					goods_name: "",
					goods_price: 0,
				},
				checkList: [], //动态参数
				checkLists: [], //静态参数
				value: [], //当前分类ID数组
				options: [],
				defaultProps: {
					expandTrigger: "hover",
					label: "cat_name",
					value: "cat_id",
					children: "children",
				},
				addGoodsData: {
					//名称
					goods_name: "",
					//价格
					goods_price: 0,
					//分类,以为','分割的字符串分类列表
					goods_cat: "",
					//数量
					goods_number: 0,
					//参数，包括动态和静态参数数组
					attrs: [],
					//重量
					goods_weight: 0,
					//上传图上路径组成的数组
					pics: [],
					//介绍-富文本信息
					goods_introduce: "",
				},
				addrules: {
					goods_name: [{
						required: true,
						message: "请输入商品名称",
						trigger: "blur"
					}, ],
					goods_price: [{
						required: true,
						message: "请输入价格",
						trigger: "blur"
					}, ],
					goods_weight: [{
						required: true,
						message: "请输入重量",
						trigger: "blur"
					}, ],
					goods_number: [{
						required: true,
						message: "请输入数量",
						trigger: "blur"
					}, ],
				},
			};
		},

		mounted() {},
		created() {
			this.getspfls();
		},
		computed: {
			shuju() {
				return this.value[this.value.length - 1];
			},
		},
		methods: {
			async handleClick() {
				//点击TAB栏时触发
				console.log("点击TAB", this.shuju);
				if (this.actives === "1") {
					this.checkList = await getMoveQuietList(this.shuju);
					this.checkList.forEach((item) => {
						item.attr_vals = item.attr_vals.split(",");
					});
					console.log("参数:", this.checkList);
				} else if (this.actives === "2") {
					this.checkLists = await getMoveQuietList(this.shuju, "only");
					console.log("动参:", this.checkLists);
				}
			},
			beforeLeave() {
				//离开tabs项时的回调
				if (this.value.length !== 3) {
					this.$message({
						message: "您没有选择商品分类,必须选择完商品分类才可以进行下面操作",
						type: "error",
					});
					return false;
				}
			},
			getspfls() {
				getspfl().then((res) => {
					this.options = res;
				});
			},
			handleChange() {
				// 选择分类内容改变触发
			},
			handlePreview() {
				//点击文件列表中已上传的文件时的钩子
			},
			//上传成功的回调
			handleSuccess(res) {
				console.log("上传成功：", res);
				//上传图片对象
				let picObj = {
					pic: res.data.tmp_path
				};
				this.addGoodsData.pics.push(picObj);
				console.log(this.addGoodsData.pics);
			},
			//删除文件的回调
			handleRemove(file) {
				console.log("删除成功：", file);
				let tmp_path = file.response.data.tmp_path;
				let index = this.addGoodsData.pics.findIndex((item) => {
					return item.pic === tmp_path;
				});
				this.addGoodsData.pics.splice(index, 1);
				console.log(this.addGoodsData.pics);
			},
			addGoodsOk() {
				//添加商品btn
				// console.log(this.value)
				this.addGoodsData.goods_cat = this.value.join(",");
				//  处理商品静态参数
				console.log(this.checkLists, this.checkList);
				const checkListsData = this.checkList.map((item) => {

					console.log(item);
					return {
						attr_id: item.attr_id,
						attr_value: item.attr_vals.join(","),
					};
				});
				// 处理商品动态参数

				const checkListData = this.checkLists.map((item) => {
					return {
						attr_id: item.attr_id,
						attr_value: item.attr_vals,
					};
				});
				// 合并动静参数
				const List = [...checkListsData, ...checkListData];
				console.log(List);
				this.addGoodsData.attrs = List;

				const copyForms = _.cloneDeep(this.addGoodsData);
				console.log(copyForms);
				addGoodsApi(copyForms).then((res) => {
					this.$router.push("/goods");
				});
			},
		},
		components: {},
	};
</script>

<style>
	.el-step__title {
		font-size: 12px !important;
	}

	.el-cascader-menu__list {
		height: 300px;
	}

	/* 解决富文本高度问题 */
	.ql-container {
		height: 300px !important;
	}
</style>

<style lang='scss' scoped>
</style>
