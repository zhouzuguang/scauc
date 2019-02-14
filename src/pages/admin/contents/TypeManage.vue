<template lang="html">
  <div >
      <ContentMenu />
      <el-card>
          <el-row>
              <el-col :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.md" :xl="layout.xl">
                  <el-form ref="typeManage" :model="form" label-width="80px" :rules="rules">
                      <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                      <el-form-item>
                      <el-button type="primary" @click="onSubmit">立即创建</el-button>
                     </el-form-item>
                </el-form>


              </el-col>
          </el-row>
          <el-table
          style="width: 100%;text-align:left"
          :data="data"
          >
          <el-table-column
          type="index"
          >
        </el-table-column>

          <el-table-column
            label="名称"
            prop="title"
            sortable>
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
          <el-row>

        </el-row>
      </el-card>
  </div>
</template>

<script>
import ContentMenu from '@/components/ContentMenu'
import {getTypes,createType} from '@/api/types.js'
import {toLocalTime} from '@/utils/Date.js'
export default {
    components:{
        ContentMenu
    },
    created(){
        this.getTypes();
    },
    data(){
        return {
            rules:{
                title:[ { required: true, message: '请输入标题', trigger: 'blur' },]
            },
            layout:{
                xs:{
                    span:24
                },
                sm:{
                    span:24
                },
                md:{
                    span:18,
                    offset:2
                }
            },
            form:{
                title:''
            },
            data:[]
        }
    },
    methods:{
     onSubmit(){
            let _this = this;
            this.$refs["typeManage"].validate((valid) => {
                if(valid){
                 createType({"title":_this.form.title}).then(data => {
                     if(data.status == 'success'){
                         _this.$message({
                             type:'success',
                             message:'创建成功!',
                             duration: 1000
                         })
                         _this.data.push(data.data);
                     }else{
                         _this.$message({
                             type:'error',
                             message:data.msg,
                             duration: 1000
                         })
                     }
                 })

                }else{
                    console.log('error')
                }
            })
        },
        toLocalTime(row,col,val,index){
          return toLocalTime(val);
       },
       handle(){
           this.$message({
               type:'success',
               message:'开发中',
               duration:1000
           })
       },
       async getTypes(){
           const data = await getTypes();
           this.data = data.data;
       }

    }
}
</script>

<style lang="css">
</style>
