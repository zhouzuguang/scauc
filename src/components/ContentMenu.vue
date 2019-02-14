<template lang="html">
  <div >
      <el-menu
          mode="horizontal"
          background-color="#F8F8F8"
          class='my-menu-2'
         >
        <el-menu-item index="types" @click="redirect('/admin/typeManage')">类别管理</el-menu-item>
        <el-menu-item index="catologues" @click="redirect('/admin/catologueManage')">目录管理</el-menu-item>
        <el-menu-item index="articles" @click="redirect('/admin/articleManage')">文章管理</el-menu-item>
        <el-menu-item index="comments" @click="redirect('/admin/commentManage')" disabled>评论管理</el-menu-item>
        <el-menu-item index="comments" @click="redirect('/admin/feedbackManage')" >查看反馈</el-menu-item>
      </el-menu>

  </div>
</template>

<script>
export default {
    methods:{
        redirect(url){
            this.$router.push(url);
        }
    }
}
</script>

<style lang="css">
</style>
