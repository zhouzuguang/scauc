<template lang="html">
    <div class="" v-loading="loading">
         <el-card>
             <el-row>
                 <el-col :span="2">
                     <el-button type="success" circle size="mini" icon="el-icon-arrow-left" @click="$router.go(-1)"></el-button>
                </el-col>
             </el-row>
             <Article v-if="article"
                :article="article"
                :editable="user && user._id == article.user_id._id"
                @editArticle="editArticle"
                @deleteArticle="deleteArticle"
            />
             <hr class="divide" style="background:#67C23A">
              <Comment v-if="article"
                :comments="comments"
                :owner_id="article.user_id+''"
              />
             <hr class="divide" style="background:#67C23A">
             <Review  @saveComment="saveComment" :loading="commentLoading"/>
         </el-card>
    </div>
</template>

<script>
import {getArticle , deleteArticle} from '@/api/articles.js';
import {getCommentsByArticleId,saveComment} from '@/api/comments.js';

import Article from '@/components/Article.vue';
import Comment from '@/components/Comment.vue';
import Review from '@/components/Review.vue';


export default {
    components:{
        Comment,
        Article,
        Review
    },
    created(){
        this.getArticle();
    },
    computed:{
        user(){
            return this.$store.state.user;
        }
    },
    watch:{
        '$route':function(){
                if(this.$route.name == 'Article'){
                    this.getArticle();
                }
        }
    },
    data(){
        return {
            comments:[],
            article:null,
            form:{
                content:'',
                user:'',
                article:''
            },
            loading:true,
            commentLoading:false,
        }
    },
    methods:{
        // 获取文章
        async getArticle(){
            this.loading = true;
            const data = await getArticle(this.$route.params.id);
            if(data.status == 'error' || !data.data || JSON.stringify(data.data) == '{}'){
                this.$message({
                 showClose: true,
                 message: data.msg || '未找到这篇文章,可能已经被作者删除',
                 type: 'error',
               });
               // 出错返回上一层
               this.$router.go(-1);
               return ;
            }
            this.getComments();
            this.article = data.data;
            this.loading = false;
        },
        // 获取评论
        async getComments(){
            const data = await getCommentsByArticleId(this.$route.params.id);
            if(data.status == 'error'){
                this.$message({
                 showClose: true,
                 message: data.msg,
                 type: 'error',
               });
               return ;
            }

            this.comments = data.data;
        },
        // 保存评论
        saveComment(value){
            if(!this.user){
                this.$message({
                 showClose: true,
                 message: '请先登陆',
                 type: 'error',
             });
                 return ;
            }
            let _this = this;
            this.form.content = value;
            this.form.user = this.user._id;
            this.form.article = this.$route.params.id;
            this.commentLoading = true;
            saveComment(this.form).then(function(data){
                if(data.status == 'error'){
                    _this.$message({
                     showClose: true,
                     message: data.msg,
                     type: 'error',
                   });
                   _this.commentLoading = false;
                   return ;
               }else{
                   _this.$message({
                    showClose: true,
                    message: '评论成功',
                    type: 'success',
                  });
                  _this.form.content = '';
                  _this.comments.push(data.data);
                  _this.commentLoading = false;
               }
            })
        },
        // 编辑文章
        editArticle(){
            this.$router.push(`/article/edit/${this.$route.params.id}`);
        },
        // 删除文章
        deleteArticle(){
            this.$confirm('是否删除文章?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning',
                 center: true
               }).then(() => {
                 deleteArticle(this.$route.params.id );
                 this.$message({
                   type: 'success',
                   message: '删除成功!',
                   duration:1000
                 });
                 this.$router.go(-1);
               }).catch(() => {} );
        }
    }
}
</script>

<style lang="css">
.el-textarea__inner:hover,.el-textarea__inner:focus {
    border-color: #67C23A;
}

</style>
