<template lang="html">
  <div >
      <ContentMenu />
      <el-card>
            <el-row>
                <el-table
                style="width: 100%;text-align:left"
                :data="data.feedbacks"
                >
                <el-table-column type="expand" >
                  <template slot-scope="props">
                      <mavon-editor v-model="props.row.content " style="min-height:50px"
                      :subfield="config.subfield"
                      :boxShadow="config.boxShadow"
                      :defaultOpen="config.defaultOpen"
                      :toolbarsFlag="config.toolbarsFlag"
                      :editable="config.editable"
                      />
                  </template>
                </el-table-column>
                <el-table-column
                type="index"
                >
              </el-table-column>


                <el-table-column
                  label="标题"
                  prop="title"
                  sortable>
                </el-table-column>

                <el-table-column
                  label="邮箱">
                  <template slot-scope="props">
                      {{props.row.email}}
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
                      @click="handle(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handle(scope.$index, scope.row)">删除</el-button>
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
import {getFeedBacks} from '@/api/feedbacks.js';

export default {
    components:{
        ContentMenu
    },
    created(){
        this.getFeedBacks();
    },
    data(){
        return{
            data:{
                feedbacks:[],
            },
            config:{
                subfield:false,
                boxShadow:false,
                defaultOpen:'preview',
                toolbarsFlag:false,
                editable:false,
            },
            page:1
        }
    },
    methods:{
        async getFeedBacks(){
            const data = await getFeedBacks(`?page=${this.page}`);
            this.data = data.data;
        },
        change(page){
            this.page = page;
            this.getFeedBacks();
        },
        handle(){
            this.$message({
                type:'success',
                message:'开发中',
                duration:1000
            })
        },
        toLocalTime(row,col,val,index){
            let d =new Date(val);
            let year=d.getFullYear();
            let month=change(d.getMonth()+1);
            let day=change(d.getDate());
            let hour=change(d.getHours());
            let minute=change(d.getMinutes());
            let second=change(d.getSeconds());
            function change(t){
              if(t<10){
               return "0"+t;
              }else{
               return t;
              }
            }
           return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
       },
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
