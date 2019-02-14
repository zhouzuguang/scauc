<template lang="html">
    <el-card style="margin-bottom:20px" >

        <p class="title" v-if="user._id == $route.params.id ">我的信息</p>
        <p class="title" v-else>{{userInfo.yb.yb_usernick}}信息</p>
        <User :user="userInfo"/>
        <hr class="divide">

        <p class="title" v-if="user._id == $route.params.id ">我的文章 ({{data.total}})</p>
        <p class="title" v-else >{{userInfo.yb.yb_usernick}}的文章 ({{data.total}})</p>
        <Pagenation :data="data"
        @change="change"
        :page='page'
        :loading="loading"/>

        <hr class="divide">
        <p class="title" v-if="user._id == $route.params.id ">我的评论({{comments.length}})</p>
        <p class="title" v-else>{{userInfo.yb.yb_usernick}}的评论({{comments.length}})</p>
        <el-row v-if="comments">
             <div style="border-bottom:1px solid #e0e0e0;margin:10px 0"  v-for="(list,index) in comments" :key="index">
                <el-row style="line-height:30px;">
                    <el-col :span="2">
                        <img alt="" style="width: 30px; height: 30px; border-radius: 15px;" :src="userInfo.yb.yb_userhead" >
                    </el-col>
                    <el-col :span="22" style="text-align:left">
                         <a href="javascript:void(0)" style="font-size:12px;color:#67C23A;padding-left:5px">{{list.updatedAt|toTime}}</a>
                         <router-link v-if="list.article" :to="{ name:'Article',params:{id:list.article._id}}" style="font-size:12px;color:#67C23A">•{{list.article.title}}</router-link>
                         <a href="javascript:void(0)" v-else  style="font-size:12px;color:#67C23A">该文章已经被作者删除</a>
                   </el-col>
                </el-row>
                <el-row class="mypanel">
                    <mavon-editor v-model="list.content" style="min-height:50px"
                    :subfield="config.subfield"
                    :boxShadow="config.boxShadow"
                    :defaultOpen="config.defaultOpen"
                    :toolbarsFlag="config.toolbarsFlag"
                    :editable="config.editable"
                    />
               </el-row>
            </div>
        </el-row>
    </el-card>
</template>

<script>
import { getArticles} from '@/api/articles.js'
import {getCommentsByUserId} from '@/api/comments.js'
import {getUserById} from '@/api/users.js'
import User from '@/components/User'
import Pagenation from '@/components/Pagenation'
import {toLocalTime} from '@/utils/Date.js'


export default {
    components:{
        Pagenation,
        User
    },
    created(){
           this.getUser();
           this.getArticles();
           this.getComments();
    },
    watch:{
        '$route':function(){
            if(this.$route.name == 'User'){
              this.getUser();
              this.getArticles();
              this.getComments();
            }
        }
    },
    filters:{
        toTime(val){
            let time = new Date(val);
            let now = new Date();

            // 差距多少秒
            let t = (now - time) /1000;
            // 少于一分钟
            if(t<60){
                return '少于一分钟'
            }
            // 差距多少分钟
            t = (now - time ) / 1000 / 60;
            // 小于1小时
            if(t<60){
                return Math.round(t) + '分钟前';
            }
            t = (now - time ) / 1000 / 60 / 60;
            // 24小时内
            if(t<24){
                 return Math.round(t) + '小时前';
            }

            // yy-mm-dd hh:mm:ss
           return toLocalTime(val)

        }
    },
    computed:{
        user(){
            return this.$store.state.user;
        }
    },
    data(){
        return {
            data:[],
            loading:true,
            page:1,
            comments:[],
            userInfo:{
              yb:{}
            },
            config:{
                subfield:false,
                boxShadow:false,
                defaultOpen:'preview',
                toolbarsFlag:false,
                editable:false,
            }
        }
    },
    methods:{
            async getUser()
            {
              if(this.$store.state.user._id == this.$route.params.id){
                this.userInfo = this.$store.state.user
              }else{
                const user = await getUserById(this.$route.params.id);
                this.userInfo = user.data;
              }
            },
            // 获取文章
            async getArticles(page=1){
                this.loading = true;
                const id = this.$route.params.id;
                const query = `?user_id=${id}&page=${page}`
                const data = await getArticles(query);
                if(data.status == 'error'){
                    this.$message({
                     showClose: true,
                     message: data.msg,
                     type: 'error',
                   });
                   return ;
                }
                this.data = data.data;
                this.loading = false;
            },
            // 获取评论
            async getComments(){
                let _this = this;
                getCommentsByUserId(this.$route.params.id).then(function(data){
                    _this.comments = data.data;
                })
            },
            change(page){
                this.getArticles(page);
            }
    },
    computed:{
        user(){
            return this.$store.state.user;
        }
    }
}
</script>

<style lang="css">
.v-note-wrapper .v-note-panel .v-note-show .v-show-content{
    background: #fff
}
.mypanel .v-note-wrapper  .v-note-panel{
    border: none;

}
.v-note-panel pre{
    font-size:16px;
}
</style>
