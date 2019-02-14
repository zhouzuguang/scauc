<template lang="html">
  <div class="">
     <el-row >
          <p class='title' style="margin-bottom:5px;"> {{comments.length}} 条评论</p>
          <div style="margin:15px 0;border-bottom:1px solid #e0e0e0" v-for="(list,index) in comments"  v-if="comments" >
             <el-row style="line-height:30px;">
                 <el-col :span="2" :sm="2" :xs="2">
                     <img alt="" style="width: 30px; height: 30px; border-radius: 15px;cursor:pointer"
                     :src="list.user.yb.yb_userhead"
                     :title="list.user.yb.yb_usernick"
                     >
                 </el-col>
                 <el-col :span="8" style="text-align:left;padding-left:10px" :sm="12" :xs="22">
                     <a href="javascript:void(0)" style="font-size:12px;color:#67C23A;"><span style="font-size:14px">{{index+1}}楼</span>•{{list.updatedAt|toTime}}</a>
                     <a href="javascript:void(0)" style="font-size:12px;color:#67C23A" v-if=" owner_id == list.user._id">作者</a>
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
  </div>
</template>

<script>
export default {
      name:'Comment',
      props:{
          comments:{
              type:Array,
              default:[]
          },
          owner_id:{
              type:String
          }
      },
      data(){
        return{
            config:{
                subfield:false,
                boxShadow:false,
                defaultOpen:'preview',
                toolbarsFlag:false,
                editable:false,
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
      }
}
</script>

<style lang="css">
.comment{
    margin-top:5px;
    margin-bottom:20px;
     font-size:14px;
     font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

</style>
