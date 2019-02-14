<template lang="html">
  <div >
      <ContentMenu />
      <el-card>
            <el-row>
                <el-table
                style="width: 100%;text-align:left"
                :data="data.articles"
                >
                <el-table-column
                type="index"
                >
              </el-table-column>


                <el-table-column
                  label="标题"
                  width="400">
                  <template slot-scope="props">
                     <router-link :to=" '/article/read/' + props.row._id">{{props.row.title}}</router-link>
                  </template>
                </el-table-column>

                <el-table-column
                  label="作者"
                  width="60">
                  <template slot-scope="props">
                      <img :src="props.row.user_head" alt="" style="width:30px;height:30px;cursor:pointer" @click="getUser(props.row.user_id)">
                  </template>
                </el-table-column>

                <el-table-column
                  label="置顶"
                  >
                  <template slot-scope="props">
                      <el-switch
                       v-model="props.row.top"
                       @change="changeTop(props.row)"
                       >
                      </el-switch>
                  </template>

                </el-table-column>


                <el-table-column
                  label="创建时间"
                  :formatter="toLocalTime"
                  prop="createdAt"
                  sortable>
                </el-table-column>


                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="editArticle(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="margin-top:20px" v-if="data.total"
               background
               :page-size="data.length"
               layout="prev, pager, next"
               :total="data.total"
               :current-page="page"
               @current-change="change"
               :pager-count="5"
               small
               >
             </el-pagination>
          </el-row>
      </el-card>
  </div>
</template>

<script>
import ContentMenu from '@/components/ContentMenu'
import {getArticles,updateByArticleId,deleteArticle} from '@/api/articles.js'
import {toLocalTime} from '@/utils/Date.js'

export default {
    components:{
        ContentMenu
    },
    created(){
        this.getArticles();
    },
    data(){
        return{
            data:{
                articles:[],
            },
            page:1
        }
    },
    methods:{
        async getArticles(){
            const data = await getArticles(`?page=${this.page}`);
            this.data = data.data;
        },
        change(page){
            this.page = page;
            this.getArticles();
        },
        editArticle(index,row){
            const url = '/article/edit/' + row._id
            console.log(url);
            console.log(row)
            this.$router.push(url);
        },
        async deleteArticle(index,row){
          let _this = this;
          this.$confirm('是否删除文章?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning',
               center: true
             }).then(() => {
                deleteArticle( row._id).then( () => {
                  _this.$message({
                      type:'success',
                      message:'成功',
                      duration:1000
                  })
                  _this.articles.splice(index,1);
                })
             }).catch( () => {} );
        },
        getUser(id){
          const url = '/user/' + id;
          this.$router.push(url);
        },
        async changeTop(row){
            const data = await updateByArticleId(row._id,row);
            let _this = this;
            if(data.status == 'success'){
                _this.$message({
                    type:'success',
                    message:'成功',
                    duration:1000
                })
            }else{
                _this.$message({
                    type:'error',
                    message:data.msg,
                    duration:1000
                })
                row.top = !row.top;
            }
        },
        toLocalTime(row,col,val,index){
          return toLocalTime(val)
       },
    }
}
</script>
