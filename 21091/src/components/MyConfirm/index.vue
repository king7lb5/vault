<template>
  <Dialog
    class="dialog"
    width="430px"
    :show-close="false"
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
  >
    <div>{{ message }}</div>
    <div slot="footer">
      <Button
        @click="
          visible = false;
          $emit('cancel');
        "
        size="small"
        >取消</Button
      >
      <Button
        type="primary"
        :loading="confirmLoading"
        @click="
          confirmLoading = true;
          $emit('ok');
        "
        size="small"
        >确定</Button
      >
    </div>
  </Dialog>
</template>

<script>
import { Dialog, Button } from "element-ui";

export default {
  name: "MyConfirm",
  data() {
    return {
      /**
       * 是否显示
       */
      visible: false,
      /**
       * loading
       */
      confirmLoading: false,
    };
  },
  methods: {
    /**
     * 关闭
     */
    close() {
      this.visible = false;
    },
  },
  mounted() {
    this.visible = true;
  },
  components: {
    Dialog,
    Button,
  },
  props: {
    /**
     * 标题
     */
    title: String,
    /**
     * 消息
     */
    message: String,
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep {
    .el-dialog__header {
      padding: 10px 20px 10px;
    }

    .el-dialog__body {
      padding: 10px 20px 10px;
    }
  }

  ::v-deep .el-dialog__footer {
    padding: 0px 20px 10px;
  }
}
</style>