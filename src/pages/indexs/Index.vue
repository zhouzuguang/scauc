<template lang="html">
  <div v-loading="loading" >
      <el-card>
          <el-row :gutter="20">
              <el-col :span='18' :xs="24" :sm="18">
                <p class="title">最新公告</p>
                <el-row class="my-list" v-for="(list,index) in notice.articles " :key=" '公告' + index">
                    <el-col :span="3"  >
                        <img :src="list.user_head" alt="头像" style="width:30px;height:30px;border-radius:15px;margin:5px">
                    </el-col>
                    <el-col :span="20">
                        <div  class="pagerContent">
                            <router-link :to=" '/article/read/'+list._id"> {{list.title}}</router-link>
                        </div>
                    </el-col>
                </el-row>
                  <hr class='divide'>

                  <p class="title">最新问答</p>
                  <el-row class="my-list" v-for="(list,index) in question.articles " :key=" '问答'+index">
                      <el-col :span="3" >
                          <img :src="list.user_head" alt="头像" style="width:30px;height:30px;border-radius:15px;margin:5px">
                      </el-col>
                      <el-col :span="20" >
                          <div class="pagerContent">
                              <router-link :to=" '/article/read/' + list._id"> {{list.title}}</router-link>
                          </div>
                      </el-col>
                  </el-row>
                 <hr class='divide' style="background:#67C23A">

                 <p class="title">最新分享</p>
                 <el-row class="my-list" v-for="(list,index) in share.articles " :key=" '分享' + index">
                     <el-col :span="3" >
                         <img :src="list.user_head" alt="头像" style="width:30px;height:30px;border-radius:15px;margin:5px">
                     </el-col>
                     <el-col :span="20">
                         <div class="pagerContent">
                             <router-link :to=" '/article/read/' + list._id"> {{list.title}}</router-link>
                         </div>
                     </el-col>
                 </el-row>
                <hr class='divide' style="background:#E6A23C">
              </el-col>

              <el-col :span='6' :xs="24" :sm="6">
                  <p class='title'>上机题库</p>
                  <el-button type="primary" style="width:100%;height:100px" @click="redirect('实验题')">实验题</el-button>
                  <el-button type="success" style="width:100%;height:100px;margin:10px 0"  @click="redirect('教材习题')">教材习题</el-button>
                  <p class='title'>最新用户</p>
                  <div style="text-align:left">

                      <img alt="头像"
                      style="width:30px;height:30px;border-radius:15px;margin:5px;cursor:pointer"
                      v-for="(user,index) in users" :key=" 'img'+index"
                      :src="user.yb.yb_userhead"
                      :title="user.yb.yb_usernick"
                      @click="getUser(user._id)"
                      >

                  </div>
              </el-col>
          </el-row>
      </el-card>
  </div>
</template>

<script>
import { getArticles} from '@/api/articles.js'
import {getLastestUser} from '@/api/users.js'
export default {
    created(){
        this.getArticles();
        this.getLastestUser();
    },
    data(){
        return {
            loading:false,
            share:[],
            notice:[],
            question:[],
            users:[]
        }
    },
    watch:{
        '$route':function(){
            if(this.$route.name == 'IndexIndex'){
                this.getArticles();
                this.getLastestUser();
            }
        }
    },
    methods:{
        // 获取首页文章
        async getArticles(){
            let _this = this;
            getArticles('?type=其他&catologue=分享').then( function(share){

                _this.share = share.data;
            })

            getArticles('?type=其他&catologue=问答').then( function(question){

                _this.question = question.data;
            })

            getArticles('?type=其他&catologue=公告').then( function(notice){

                _this.notice = notice.data;
            })
        },
        // 获取最新用户
        async getLastestUser(){
            let _this = this;
            getLastestUser().then(function(data){
                _this.users = data.data;
            })
        },
        getUser(id){
          const url = '/user/' + id;
          this.$router.push(url);
        },
        redirect(catologue){
            this.$router.push(`/catologue/${catologue}`)
        },
    },

}
</script>
