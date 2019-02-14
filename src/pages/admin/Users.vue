<template lang="html">
  <div >
     <el-card>
        <el-table
              :data="data.users"
              style="width: 100%;text-align:left" >

              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" inline class="demo-table-expand">
                      <el-form ref="form"  label-width="80px">
                        <el-form-item label="昵称" >
                            {{props.row.yb.yb_usernick}}
                        </el-form-item>
                        <el-form-item label="姓名" >
                            {{props.row.yb.yb_username}}
                        </el-form-item>
                        <el-form-item label="性别" >
                            <template v-if="props.row.yb.yb_sex == 'M'">
                                男
                            </template>
                            <template v-else>
                                女
                            </template>
                        </el-form-item>
                        <el-form-item label="学校" >
                            {{props.row.yb.yb_schoolname}}
                        </el-form-item>
                        <el-form-item label="注册时间" >
                            {{props.row.yb.yb_regtime}}
                        </el-form-item>
                    </el-form>

                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
              type="index"
              >
            </el-table-column>
              <el-table-column
                label="用户名"
                prop="yb.yb_username"
                sortable
                >
              </el-table-column>

              <el-table-column
                label="管理员"
                >
                <template slot-scope="props">
                    <el-switch
                     v-model="props.row.admin"
                     @change="changeAdmin(props.row)"
                     >
                    </el-switch>
                </template>

              </el-table-column>

              <el-table-column
                label="最近修改时间"
                prop="updatedAt"
                :formatter="toLocalTime"
                sortable
                >
              </el-table-column>

               <el-table-column
                    label="操作"
                    >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handle(scope.$index, scope.row,scope)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handle(scope.$index, scope.row)" >删除</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        @click="getUser(scope.$index, scope.row)" >查看</el-button>
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
     </el-card>
  </div>
</template>

<script>
import {getUsersByPage,updateByUserId} from '@/api/users.js'
import {toLocalTime} from '@/utils/Date.js'
export default {
    created(){
        this.getUsersByPage();
    },
    data(){
        return {
            page:1,
            data:{},
        }
    },
    methods:{
        async getUsersByPage(){
            let data = await getUsersByPage(`?page=${this.page}`);
            this.data = data.data;
        },
        change(page){
            this.page = page;
            this.getUsersByPage();
        },
        toLocalTime(row,col,val,index){
          return toLocalTime(val)
       },
       getUser(index,row){
         const url = '/user/' + row._id;
         this.$router.push(url);
       },
       handle(index,row){
           this.$message({
               type:'success',
               message:'开发中',
               duration:1000
           })
       },
       async changeAdmin(row){
           const data = await updateByUserId(row._id,row);
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
           }
       }
    },
    fliters:{

    }
}
</script>

<style lang="css">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
