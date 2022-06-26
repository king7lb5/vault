<template>
    <div>
<el-result title="404" subTitle="您访问的页面不存在">
  <template slot="icon">
  </template>
  <template slot="extra">
    <el-button type="primary" size="medium" @click="$router.back()">返回</el-button>
  </template>
</el-result>
    </div>
</template>

<script>
    export default {
        name:"NotFount"
    }
</script>

<style scoped>

</style>