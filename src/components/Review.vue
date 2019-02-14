<template lang="html">
  <div >
      <el-row>
           <p class='title'>添加评论</p>
         <mavon-editor v-model="comment" style="min-height:250px;margin-bottom:20px"
         :subfield="config.subfield"
         :boxShadow="config.boxShadow"
         :toolbars="config.toolbars"
         placeholder='你要写点什么？'
         @save="save"
         prop="content"
         />
          <el-button type="success" @click="save"  v-loading="loading">评论</el-button>
      </el-row>
  </div>
</template>

<script>
export default {
    name:'Review',
    props:{
        loading:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            comment:'',
            config:{
                subfield:false,
                boxShadow:false,
                toolbars:{
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    code: true, // code
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    preview: true, // 预览
                }
            },
        }
    },
    methods:{
        save(){
            if(this.comment != ''){
                this.$emit('saveComment',this.comment);
                this.comment = '';
            }else{
                this.$message({
                 showClose: true,
                 message: '不能为空',
                 type: 'error',
               });
            }

        }
    }

}
</script>

<style lang="css">
</style>
