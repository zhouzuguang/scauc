<template lang="html">
    <el-card>
        <el-form ref="feedback" status-icon :model="form" label-width="80px" :rules="rule">
          <el-form-item label="反馈标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="反馈内容">
              <mavon-editor v-model="form.content" style="min-height:400px;margin-bottom:10px"
              :subfield="config.subfield"
              :boxShadow="config.boxShadow"
              :toolbars="config.toolbars"
              placeholder='你要写点什么？'
              @save="save"
              prop="content"
              />
          </el-form-item>
        </el-form>
        <el-button type="success" @click="save">提交</el-button>
    </el-card>
</template>
<script>
import {postFeedBack} from '@/api/feedbacks.js';

export default {
    computed:{
        user(){
            return this.$store.state.user;
        }
    },
    methods:{
        save(){
            let _this = this;
            this.$refs["feedback"].validate(function(valid){
                 if (valid) {
                     _this.form.user = _this.user._id;
                    postFeedBack(_this.form).then(function(res){
                        if(res.status == 'success'){
                            _this.$message({
                             showClose: true,
                             message: '感谢您的反馈!',
                             type: 'success',
                           });
                           _this.$router.go(-1);
                       }else{
                           _this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error',
                            duration:1000
                          });
                       }
                    })

                 } else {
                   return false;
                 }
           });
        }
    },
    data(){
        return {
            rule:{
                title:[
                    { required: true, message: '长度在 1 到 25 个字符', trigger: 'blur' },
                    { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
                ],
                email:[
                    {type: "email", message:'邮箱格式不正确',required: true,trigger:'blur'},
                ],
                content:[
                    { required: true, message: '长度在 1 到 300 个字符', trigger: 'blur' },
                    { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
                ],
            },
            form:{
                content:'',
                title:'',
                email:''
            },
            config:{
                subfield:false,
                boxShadow:false,
                toolbars:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
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
    }
}
</script>
