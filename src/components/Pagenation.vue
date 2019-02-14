<template lang="html">
  <div v-loading='loading'>
      <el-card>
          <el-row class="my-list" v-for="(list,index) in data.articles" :key="index">
           <el-col :span="2" :xs="2">
               <img :src="list.user_head" alt="头像"
                style="width:30px;height:30px;border-radius:15px;margin:5px;cursor:pointer">
           </el-col>

           <el-col :span="20" :xs="18" >
               <div class="pagerContent" style="padding-left:18px; ">
                   <span style="background:#409EFF;color:#fff;padding:4px 8px;font-size:12px;letter-spacing:2px;border-radius:5px" v-if="list.top">置顶</span>
                   <router-link :to=" '/article/read/' + list._id">{{list.title}}</router-link>
               </div>
           </el-col>
           <el-col :span="2" :xs="2"> <span style="background:#67C23A;color:#fff;padding:4px 8px;font-size:12px;letter-spacing:2px;border-radius:5px">{{list.read|toMuch}}</span></el-col>
         </el-row>
         <br/>
         <el-pagination style="margin-top:20px;clear:both" v-if="data.total"
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
export default {
    props:{
        page:{
          type:Number,
          default:1
       },
       loading:{
         type:Boolean,
         default:false
       },
        data:{
            type:[Object,Array],
            default:function(){
              return {
                  articles:[],
                  length:0,
                  total:0
              }
            }
        }
    },
    methods:{
        change(page){
            this.$emit('change',page);
        }
    },
    filters:{
        toMuch(val){
            if(val>99999){
                return '10w+';
            }
            return val;
        }
    }
}
</script>

<style lang="css">



</style>
