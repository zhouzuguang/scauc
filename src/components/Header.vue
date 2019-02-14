<template lang="html">
    <div>
      <el-menu
        mode="horizontal"
        unique-opened
        background-color="#495060"
        text-color="#C2C5CA"
        active-text-color="#fff"
        class="my-menu"
        >
        <el-menu-item index="/" style="color:#fff;font-weight:bold" @click="redirect('/')">华农C语言互助平台<small><i>V1.0</i></small></el-menu-item>
        <el-menu-item index="other" disabled  class="sm_display">
             <el-input  placeholder="华农C语言互助平台" class="my-search" ></el-input>
         </el-menu-item>

        <template v-if="user && user.admin">
            <el-menu-item index="/content" class="md_show"  @click="redirect('/admin/articleManage')">内容管理</el-menu-item>
            <el-menu-item index="/user" class="md_show"  @click="redirect('/admin/users')">用户管理</el-menu-item>
        </template>

        <el-submenu index="2"  style="float:right">

          <template slot="title">
              <img :src="user.yb.yb_userhead" alt="" style="width:30px;height:30px;border-radius:10px" v-if="user">
              <img :src="userhead" alt="" style="width:30px;height:30px;border-radius:10px" v-else>
          </template>

          <el-menu-item index="/login" @click="login" v-if="!user">登陆</el-menu-item>
          <template v-if="user">
              <el-menu-item index="/article/edit" @click="redirect('/article/edit')">写文章</el-menu-item>
              <el-menu-item index="/user/my" @click="myInfo">个人资料</el-menu-item>
              <el-menu-item index="/other/feedback" @click="redirect('/other/feedback')">反馈</el-menu-item>
              <el-menu-item index="/logout" @click="logout">退出</el-menu-item>
         </template>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
import { login,logout } from '@/api/users'
import userhead from '@/assets/img/200.png'
import { loginUrl } from '@/config'
  export default {
    created(){
        this.getUser();
     },
    data() {
      return {
        userhead
      };
    },
    computed:{
        user(){
            return this.$store.state.user;
        },
    },
    methods: {
        async getUser(query){

             const data = await login(query);
             if(data.status == 'error'){
                 this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error',
                });
                return ;
             }

             if(data.data){
                  this.$store.commit('storeUser',data.data);
             }
         },
        redirect(url){
            this.$router.push(url);
        },
        myInfo(){
          const url = '/user/' + this.user._id;
          this.redirect(url);
        },
        login(){
          document.location.href = loginUrl
        },
        async logout(){
            const data = await logout();
            this.$store.commit('deleteUser');
            this.$message({
                type:'success',
                message:'成功',
                duration:1000
            })
            this.$router.push('/')
        }

    },
  }
</script>

<style lang="css">

@media  screen and (max-width: 768px)  {
    .sm_show{
        display: show;
    }
    .md_show{
        display:none;
    }
}

@media  screen and (min-width: 769px)  {
    .sm_show{
        display: none;
    }
}

.my-search{
    line-height: 30px;
    cursor: default;
}
.my-search>input{
        line-height: 30px;
        height:30px;
        background: #606674;
        border:1px solid #606674;
        width:80%;
        font-size:12px;
        color:#fff;
}
.my-search>input:hover,.my-search>input:focus{
        border:1px solid #606674;
}
.my-menu>li{
    font-size:16px
}
.my-menu>li:hover{
    color:#fff;
}

</style>
