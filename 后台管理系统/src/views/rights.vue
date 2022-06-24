<template>
  <div class="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mtop16">
      <el-table :data="tableData" border>
        <el-table-column align="center" type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" height="80">
        </el-table-column>
        <el-table-column prop="path" label="路径" height="80">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" height="80">
          <template slot-scope="scope">
            <div>
              <el-tag :type="tagarr[scope.row.level]">
                {{ scope.row.level | filter }}
                <!-- 过滤初始数据0为一级,二级,三级 -->
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getqxlist } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      tagarr: ["primary", "success", "warning"],
    };
  },
  mounted() {},
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      getqxlist().then((res) => {
        this.tableData = res;
      });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped></style>
