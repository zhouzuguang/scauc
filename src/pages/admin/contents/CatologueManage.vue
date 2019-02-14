<template lang="html">
  <div >
      <ContentMenu />
      <el-card>
          <el-row>
              <el-col :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.md" :xl="layout.xl">
                    <el-form ref="catologueManage" :model="form" label-width="80px" :rules="rules">
                        <el-form-item label="分类" prop="type" >
                              <el-select v-model="form.type" placeholder="请选择分类" style="width:100%">
                                <el-option :label="option.title" :value="option.title" v-for="(option,index) in types" :key="index"></el-option>
                              </el-select>
                        </el-form-item>
                        <el-form-item label="标题" prop="title">
                          <el-input v-model="form.title"></el-input>
                      </el-form-item>
                      <el-form-item>
                      <el-button type="primary" @click="onSubmit">立即创建</el-button>
                     </el-form-item>
                </el-form>
              </el-col>
          </el-row>

          <el-row>
              <el-table
              style="width: 100%;text-align:left"
              :data="data"
              >
              <el-table-column
              type="index"

              >
            </el-table-column>

            <el-table-column
              label="分类"
              prop="type"
              :filters="type"
              :filter-method="filterHandler"
              sortable>
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

              <el-table-column
                label="对外可编辑"
                >
                <template slot-scope="props">
                    <el-switch
                     v-model="props.row.show"
                     @change="changeShow(props.row)"
                     >
                    </el-switch>
                </template>

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
        </el-row>
      </el-card>
  </div>
</template>

<script>
import ContentMenu from '@/components/ContentMenu'
import {getTypes} from '@/api/types.js'
import {getCatologues,updateByCatologueId,createCatologue} from '@/api/catologues.js'
import {toLocalTime} from '@/utils/Date.js'
export default {
    components:{
        ContentMenu
    },
    created(){
        this.getTypes();
        this.getCatologues();
    },
    computed:{
        type(){
            let types = [];
            for(let i in this.types){
                types.push({"text":this.types[i].title,"value":this.types[i].title})
            }
            return types || [];
        }
    },
    data(){
        return {
            rules:{
                title:[ { required: true, message: '请输入标题', trigger: 'blur' },],
                catologue:[ { required: true, message: '请输入标题', trigger: 'blur' },]
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
                title:'',
                type:''
            },
            data:[],
            types:[]
        }
    },
    methods:{
     onSubmit(){
            let _this = this;
            this.$refs["catologueManage"].validate((valid) => {
                if(valid){
                 createCatologue({"title":_this.form.title,"type":_this.form.type}).then(data => {
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
          return toLocalTime(val)
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
           this.types = data.data;
       },
       async getCatologues(){
           const data = await getCatologues();
           this.data = data.data;
       },
       filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
      },
      async changeShow(row){
          if(row.type !='其他'){
              this.$message({
                  type:'error',
                  message:'这个分类不可对外编辑',
                  duration: 1000
              })
              row.show = false;
              return ;
          }else{
              const data = await updateByCatologueId(row._id,row);
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

      }
    }
}
</script>
