<template>
	<div class="">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card class="mtop16">
			<div>
				<el-input placeholder="请输入内容" v-model="list.query" class="input-with-select" @input="search">
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
				<el-button type="primary" class="left" @click="to" style="margin-left: 20px">添加用户</el-button>
			</div>

			<el-table :data="tableData" border>
				<el-table-column align="center" type="index" label="#" width="80">
				</el-table-column>
				<el-table-column prop="goods_name" label="商品名称" height="80">
				</el-table-column>
				<el-table-column prop="goods_price" label="商品价格(元)" height="80">
				</el-table-column>
				<el-table-column prop="goods_weight" label="商品重量" height="80">
				</el-table-column>
				<el-table-column prop="roleDesc" label="创建时间" height="80">
					<template slot-scope="scope">
						<div>
							{{ scope.row.add_time | time }}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="goods_id" label="操作" height="80">
					<template slot-scope="scope">
						<div>
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="editdj(scope.row)">
							</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete"
								@click="remove(scope.row.goods_id)"></el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 分页 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="list.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="list.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!-- 修改的模态框 -->
		<el-dialog title="编辑" :visible.sync="editss" width="30%">
			<el-form :model="edit">
				<el-form-item label="商品名称">
					<el-input v-model="edit.goods_name"></el-input>
				</el-form-item>

				<el-form-item label="商品价格(元)">
					<el-input v-model="edit.goods_price"></el-input>
				</el-form-item>

				<el-form-item label="商品数量">
					<el-input v-model="edit.goods_number"></el-input>
				</el-form-item>

				<el-form-item label="商品重量">
					<el-input v-model="edit.goods_weight"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editss = false">取 消</el-button>
				<el-button type="primary" @click="bgqd">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import _ from "lodash";
	import {
		getsplb,
		removesp,
		getspbgtj
	} from "@/http/api";
	export default {
		data() {
			return {
				tableData: [],
				list: {
					query: "",
					pagesize: 5,
					pagenum: 1,
				},
				total: 0,
				editss: false,
				edit: {
					id: "",
					goods_name: "",
					goods_price: "",
					goods_number: "",
					goods_weight: "",
				},
			};
		},
		mounted() {},
		created() {
			this.getspList();
		},
		methods: {
			search: _.debounce(function() {
				this.getspList();
			}, 2000),
			getspList() {
				getsplb(this.list).then((res) => {
					// console.log(res);
					this.tableData = res.goods;
					this.total = res.total;
					console.log(this.tableData);
				});
			},
			to() {
				//点击添加按钮跳转链接
				this.$router.push("/add");
			},
			remove(id) {
				//删除
				removesp(id).then((res) => {
					this.getspList();
				});
			},
			editdj(row) {
				//编辑框
				this.editss = true;
				this.edit.id = row.goods_id;
				this.edit.goods_name = row.goods_name;
				this.edit.goods_price = row.goods_price;
				this.edit.goods_number = row.goods_number;
				this.edit.goods_weight = row.goods_weight;
			},
			bgqd() {
				//编辑确定
				getspbgtj(this.edit).then(res => {
					this.getspList()
				});
			},
			handleSizeChange(val) {
				this.list.pagesize = val;
				this.getspList();
			},
			handleCurrentChange(val) {
				this.list.pagenum = val;
				this.getspList();
			},
		},
		components: {},
	};
</script>

<style lang='scss' scoped>
	.input-with-select {
		width: 500px;
	}
</style>
