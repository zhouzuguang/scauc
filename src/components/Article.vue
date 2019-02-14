<template lang="html">
  <div style="position:relative">
      <div style="position:absolute;left:120px;top:-60px" class="sm_display">
           <img :src="article.user_id.yb.yb_userhead" alt="" style="width:100px;height:100px;border-radius:50px;" >
             <p style="margin-top:5px;">{{article.user_id.yb.yb_usernick}}</p>
      </div>

      <h3>{{article.title}}</h3>
      <el-row style="font-size:12px;line-height:30px;font-weight:bold;">
          <span>发布时间: &nbsp;{{article.createdAt|toLocalTime }}</span>
          <span> 浏览次数 &nbsp;{{ article.read }}</span>
          <el-col v-if="editable">
              <el-button type="success"  size="mini" icon="el-icon-edit" @click="editArticle" >编辑</el-button>
              <el-button type="danger"  size="mini" icon="el-icon-delete" @click="deleteArticle" >删除</el-button>
          </el-col>
      </el-row>
      <el-row>
          <mavon-editor v-model="article.content" style="min-height:50px;margin-top:10px"
          :subfield="config.subfield"
          :editable="config.editable"
         :toolbarsFlag="config.toolbarsFlag"
         :defaultOpen="config.defaultOpen"
         :boxShadow="config.boxShadow"
          ref="readmd"
          />
      </el-row>
  </div>
</template>

<script>
export default {
      name:'Article',
      props:{
            article:{
                type:Object
            },
            editable:{
                type:Boolean,
                default:false,
            }
    },
    mounted(){

    },
    data(){
        return {
            config:{
                subfield:false,
                editable:false,
                toolbarsFlag:false,
                defaultOpen:'preview',
                boxShadow:false
            },
        }
    },
    filters:{
        toLocalTime(val){
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
       }
    },
    methods:{

        editArticle(){
            this.$emit('editArticle');
        },
        deleteArticle(){
            this.$emit('deleteArticle');
        }
    }
}
</script>

<style lang="css">
</style>
