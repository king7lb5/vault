<template>
  <div class="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部提示框 -->
    <el-card class="mtop16">
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        effect="dark"
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类 -->
      <el-row class="mtop16">
        <el-col :span="3">选择商品分类</el-col>
        <el-col :span="21">
          <!-- 联级框 -->
          <el-cascader
            v-model="value"
            :options="options"
            :props="defaultProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- tab框 -->
      <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="参数名称" name="many">
          <el-button type="primary" size="mini" @click="addParams"
            >添加参数</el-button
          >
          <!-- 表格 -->
          <el-table :data="manyParmsData" border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="index"
                  v-for="(item, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="editdia(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    @click="dele(scope.row.attr_id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="属性管理">
          <el-button type="primary" size="mini" @click="jingtaiParams"
            >添加属性</el-button
          >
          <!-- 表格 -->
          <el-table :data="onlyParamsData" border>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button type="primary" size="mini">编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="dele(scope.row.attr_id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加 -->
    <el-dialog title="编辑" :visible.sync="EditdialogVisible" width="40%">
      <el-form ref="addform" :model="addform" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="addform.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addformOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="动态添加参数" :visible.sync="dialogVisible" width="40%">
      <el-form ref="addform" :model="addform" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="addform.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editformOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 静态模态框 -->
    <el-dialog title="静态参数" :visible.sync="jingtaiDia" width="40%">
      <el-form ref="jingtai" :model="jingtai" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="jingtai.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jingtaiDia = false">取 消</el-button>
        <el-button type="primary" @click="jingtaiOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getflList,
  getMoveQuietList,
  addPrarams,
  editFenlei,
  deleParams,
  jingtaiParams,
} from "@/http/api";
export default {
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      activeName: "many",
      value: [], //分类ID
      options: [], //数据源
      manyParmsData: [], //动态参数
      onlyParamsData: [], //静态参数
      defaultProps: {
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
      // 模态框
      dialogVisible: false,
      addform: {
        attr_name: "",
      },
      // 编辑
      EditdialogVisible: false,
      jingtai: {
        attr_name: "",
      },
      jingtaiDia: false,
    };
  },
  computed: {
    cate_id() {
      return this.value[this.value.length - 1];
    },
  },
  created() {
    this.getfenleiList();
    // this.getspflList();
    this.jingtaicanshu();
  },
  methods: {
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      // console.log("handleInputConfirm", row);
      if (row.inputValue.length > 0) {
        row.attr_vals.push(row.inputValue);
      }
      row.inputVisible = false;
      row.inputValue = "";
    },
    getfenleiList() {
      //获取数据
      getflList().then((res) => {
        // console.log(res);
        this.options = res;
      });
    },
    getspflList() {
      //获取商品分类参数
      if (this.value.length !== 3) {
        this.$message({
          message: "必须选择三级分类",
          type: "error",
        });
        return;
      }
      getMoveQuietList(this.cate_id, this.activeName).then((res) => {
        if (this.activeName === "many") {
          res.forEach((item) => {
            item.inputVisible = false;
            item.inputValue = "";
            //字符串转换为数组
            item.attr_vals =
              item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
          });
          this.manyParmsData = res;
          // console.log("this.manyParmsData", this.manyParmsData);
        } else if (this.activeName === "only") {
          this.onlyParamsData = res;
          // console.log("this.onlyParamsData", this.onlyParamsData);
        }
      });
    },
    handleClick() {
      //TAB的点击事件
      // console.log(111);
      // this.getspflList();
      this.getfenleiList();
    },
    handleChange() {
      //选择联级框数据改变触发
      this.getspflList();
    },
    // 添加参数
    addParams() {
      this.dialogVisible = true;
    },
    // 添加参数确定
    addformOk() {
      // console.log(this.addform);
      editFenlei(this.cate_id, this.addform.attr_id, {
        attr_name: this.addform.attr_name,
        attr_vals: this.addform.attr_vals,
        attr_sel: this.activeName,
      });
      this.getspflList();
      this.EditdialogVisible = false;
    },
    // 编辑
    editdia(row) {
      // console.log(row);
      this.EditdialogVisible = true;
      this.addform.attr_name = row.attr_name;
      this.addform.attr_vals = row.attr_vals.join(",");
      this.addform.attr_id = row.attr_id;
    },
    // 编辑确定
    async editformOk() {
      // console.log(this.addform);
      this.$refs.addform.validate((valid) => {
        if (!valid) return false;
        const res = addPrarams(this.cate_id, {
          attr_name: this.addform.attr_name,
          attr_sel: this.activeName,
        });
        // console.log(res);
      });
      this.getspflList();
      this.dialogVisible = false;

      // await editFenlei(this.cate_id, this.addform.attr_id, {
      //   attr_name: this.addform.attr_name,
      //   attr_vals: this.addform.attr_vals,
      //   attr_sel: this.activeName,
      // // });
      // this.getspflList();
      // this.EditdialogVisible = false;
    },
    // 删除参数
    async dele(id) {
      // console.log(id);
      await deleParams(this.cate_id, id);
      this.getspflList();
    },
    jingtaiParams() {
      console.log(this.cate_id, this.activeName);
      this.jingtaiDia = true;
    },
    jingtaicanshu() {
      jingtaiParams(this.cate_id).then((res) => {
        console.log(res);
        this.onlyParamsData = res;
      });
    },
    jingtaiOk() {
      console.log(this.jingtai);
      this.jingtaicanshu();
    },
  },
};
</script>

<style>
.el-scrollbar {
  height: 300px;
}
</style>
<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
