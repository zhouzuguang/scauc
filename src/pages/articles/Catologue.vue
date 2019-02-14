<template lang="html">
  <div v-loading="loading">
      <el-card>
          <el-button type="success" circle size="mini" icon="el-icon-arrow-left" @click="$router.go(-1)" style="float:left"></el-button>
          <p>{{type}}</p>
          <el-table
           :data="data"
           style="width: 100%;text-align:left" >

           <el-table-column type="expand" >
             <template slot-scope="props">
               <el-form label-position="left"  >
                 <el-form-item label="" class="my-table-item" v-for="(list,index) in props.row.articles" :key="index">
                   <el-col :span="20" :offset="2">
                        <router-link :to=" '/article/read/'+list._id">{{index+1}} - {{list.title}}</router-link>
                   </el-col>
                 </el-form-item>
               </el-form>

             </template>
           </el-table-column>

           <el-table-column

             label="名称"
             prop="title"

             >
           </el-table-column>

           <el-table-column
             label="分类"
             prop="type"
             sortable
             >
           </el-table-column>

           <el-table-column
             label="问题"
             >
             <template slot-scope="prop">
                 <el-tag>{{prop.row.articles.length}}</el-tag>
             </template>
           </el-table-column>


         </el-table>
      </el-card>
  </div>
</template>

<script>
import { getCatologue } from '@/api/catologues.js'
export default {
    created(){
        this.getCatologues();
    },
    watch:{
        '$route':function(){
            if(this.$route.name == 'Catologue'){
                this.getCatologues();
            }
        }
    },
    methods:{
        async getCatologues(){
            const  type = this.$route.params.type;
            this.loading = true;
            if(type){
                const data = await getCatologue(`?type=${type}`);
                if(data.status == 'error'){
                    this.$message({
                     showClose: true,
                     message: data.msg,
                     type: 'error',
                     duration:1000
                   });
                   return ;
                }
                this.type = type;
                this.data = data.data.reverse();
            }
            this.loading = false;
        }
    },
    data(){
        return {
            data:[],
            type:'',
            loading:true
        }
    }
}
</script>

<style lang="css">

.my-table-item{
    width:100%;
    margin-bottom:0;

}
.my-table-item:hover{
    background: #dfdfdf
}
</style>
