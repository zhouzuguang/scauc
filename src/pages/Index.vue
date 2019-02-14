<template lang="html">
  <div v-loading="loading">
      <el-menu
          mode="horizontal"
          background-color="#F8F8F8"
          class='my-menu-2'
          router
         >
        <el-menu-item :index=" '/index/' ">首页</el-menu-item>
        <el-menu-item :index=" '/index/' + item.title +'/1' " v-for="(item,index) in  menu" :key="index">{{item.title}}</el-menu-item>
      </el-menu>

      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<script>
import { getType } from '@/api/types.js'

export default {
    created(){
        this.getType();
    },
    data(){
        return {
            menu:[],
            loading:true,
        }
    },
    methods:{
        async getType(){
            const data = await getType('其他');
            this.menu = data.data.catologues;
            this.loading = false;
        }
    }
}
</script>

<style lang="css">
.el-menu--horizontal>.el-menu-item.is-active {
    border: none;
}
.my-menu-2>li{
    font-size:15px
}

@media  screen and (max-width: 700px)  {

    .my-menu-2>li{
        font-size:12px
    }
}

</style>
