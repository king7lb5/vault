<template>
  <div class="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="mtop16">
      <div style="width: 100%">
        <el-button type="primary" class="left" @click="add">添加用户</el-button>
      </div>

      <el-table :data="tableData" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>
              <el-row v-for="item in scope.row.children" :key="item.id">
                <el-col :span="6">
                  <el-tag closable @close="remove(scope.row.id, item.id)">{{
                    item.authName
                  }}</el-tag>
                </el-col>
                <el-col :span="14">
                  <el-row v-for="item1 in item.children" :key="item1.id">
                    <el-col :span="10">
                      <el-tag
                        type="success"
                        closable
                        @close="remove(scope.row.id, item1.id)"
                      >
                        {{ item1.authName }}</el-tag
                      >
                    </el-col>
                    <el-col
                      :span="14"
                      v-for="item2 in item1.children"
                      :key="item2.id"
                    >
                      <el-tag
                        type="warning"
                        closable
                        @close="remove(scope.row.id, item2.id)"
                      >
                        {{ item2.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" height="80">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" height="80">
        </el-table-column>
        <el-table-column prop="name" label="操作" height="80">
          <template slot-scope="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="bg(scope.row)"
              >
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="remove(scope.row.id)"
              >
              </el-button>
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="role(scope.row)"
              >
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加的模态框 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%">
      <el-form :model="addUserData" :rules="addUserDataRules">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="addUserData.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述">
          <el-input v-model="addUserData.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的模态框 -->
    <el-dialog title="添加角色" :visible.sync="editss" width="30%">
      <el-form :model="edits" :rules="addUserDataRules">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="edits.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述">
          <el-input v-model="edits.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editss = false">取 消</el-button>
        <el-button type="primary" @click="bgqd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限的模态框 -->
    <el-dialog title="分配权限" :visible.sync="roleS" width="60%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :default-checked-keys="array"
        :props="defaultProps"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="roleS = false">取 消</el-button>
        <el-button type="primary" @click="fpqd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  jueseliebiao,
  addjuese,
  removejuese,
  gbaddjuese,
  gbidjuese,
  getqxlb,
  getsqjs,
  qxremove,
} from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      tree: [],
      addUserData: {
        //添加角色的数据
        roleName: "",
        roleDesc: "",
      },
      editss: false, //编辑模态框的初始状态
      roleS: false, //分配全选的模态框的初始状态
      defaultProps: {
        children: "children",
        label: "authName",
      },
      array: [],
      data: {
        //权限列表
      },
      sqid: "",
      edits: {
        roleName: "",
        roleDesc: "",
      },
      addUserDataRules: {
        //正则
        roleName: [
          {
            required: true,
            message: "请输入角色",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          {
            required: true,
            message: "请输入角色描述",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  created() {
    this.getlist();
    this.getqxlbs();
  },
  methods: {
    getlist() {
      //获取角色列表数据
      jueseliebiao().then((res) => {
        this.tableData = res;
        // console.log('res:',res);
      });
    },
    getqxlbs() {
      getqxlb().then((res) => {
        // console.log("权限列表", res);
        this.data = res;
        // console.log("权限列表data", res);
      });
    },
    add() {
      //点击让模态框显示
      this.dialogVisible = true;
    },
    addsave() {
      //添加确定事件
      addjuese(this.addUserData).then((res) => {
        this.getlist();
      });
      this.dialogVisible = false;
    },
    remove(id) {
      //删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removejuese(id).then((res) => {
            console.log(res);
            this.getlist();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    bg(row) {
      //编辑弹框
      this.editss = true;
      console.log(row);
      this.edits.roleName = row.roleName;
      this.edits.roleDesc = row.roleDesc;
      this.edits.id = row.id;
      gbidjuese(this.edits).then((res) => {
        this.getlist();
      });
    },
    bgqd() {
      //编辑确定
      gbaddjuese(this.edits).then((res) => {
        this.getlist();
      });
      this.editss = false;
    },
    role(row) {
      //分配
      this.roleS = true;
      console.log("row:", row);
      this.sqid = row.id;
      this.dg(row, this.array);
    },
    // 递归循环,自己调用自己往下查找直到每有children
    dg(row, arr) {
      if (!row.children) {
        return arr.push(row.id);
      }
      row.children.forEach((item) => this.dg(item, arr));
    },
    fpqd() {
      //分配权限确定按钮
      let isArrayYes = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ];
      // console.log(isArrayYes.join(','));
      getsqjs(this.sqid, isArrayYes.join(",")).then((res) => {
        this.getlist();
      });
      this.roleS = false;
    },
    // remove(roleId,rightId){ //删除单个权限
    //   console.log(roleId,rightId);
    //   qxremove(roleId,rightId).then(res=>{
    //     this.getlist()
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.el-tag {
  text-align: center;
  margin: 0 auto;
}
</style>
