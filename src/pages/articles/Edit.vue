<template lang="html">
  <div v-loading="loading" style="margin-top:15px">
      <el-form ref="form" status-icon :model="form" label-width="80px" :rules="rules">

         <el-form-item label="标题"  prop="title">
           <el-input v-model="form.title" placeholder='3-25个字符'></el-input>
         </el-form-item>

         <el-form-item label="发布类别" v-if="user.admin"  prop="type">
           <el-select v-model="form.type" placeholder="发布类别" style="width:100%"  :disabled="edit">
             <el-option v-for="(item,index) in type" :label="item.title" :value="item.title" :key="index"></el-option>
           </el-select>
         </el-form-item>

         <el-form-item label="发布板块"   prop="catologue">
           <el-select v-model="form.catologue" placeholder="发布板块" style="width:100%" :disabled="edit">
             <el-option v-for="(item,index) in catologue" :label="item.title" :value="item.title" :key="index" v-if="item.show || user.admin"></el-option>
           </el-select>
         </el-form-item>

         <el-form-item label="是否置顶"  style="width:200px" v-if="user.admin"  >
           <el-switch v-model="form.top"></el-switch>
         </el-form-item>

        </el-form>
       <mavon-editor ref="md" v-model="form.content" style="min-height:500px;margin-bottom:20px"
       :subfield="config.subfield"
       placeholder='你要写点什么？'
       @save="save"
       @imgAdd="$imgAdd"
       />
       <el-button @click="save" type="primary" style="margin-bottom:20px">
           发表
       </el-button>
  </div>
</template>

<script>
import {getType,getTypes} from '@/api/types';
import {fileUpload} from '@/api/index'
import {getArticle,postArticle,updateArticle} from '@/api/articles';
export default {
    created(){
        if( this.$route.name == 'EditById' && this.$route.params.id){
            this.edit = true;
            this.getArticle();
        }else{
            this.edit = false;
        }

        if(this.user.admin){

            this.getTypes();
        }else{
            this.getType();
        }

    },
    watch:{
        '$route':function(){
            if(this.$route.name == 'EditById' && this.$route.params.id){
                    this.getArticle();
            }
            if(this.$route.name == 'Edit'){
                this.form = {
                    title:'',
                    type:'其他',
                    catologue:'',
                    top:false,
                    user_id:'',
                    user_head:'',
                    content:''
                }
            }
        }
    },
    data(){
        return {
            edit:false,
            loading:true,
            img:[],
            config:{
                subfield:false,
            },
            form:{
                title:'',
                type:'其他',
                catologue:'',
                top:false,
                user_id:'',
                user_head:'',
                content:''
            },
            rules:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: ['blur'] }
                ],
                type:[
                    { required: true, message: '请选择类别', trigger: ['blur'] },
                ],
                catologue:[
                    { required: true, message: '请选择板块', trigger: ['blur'] },
                ]
            },
            type:[]
        }
    },
    computed:{
        user(){
            const user = this.$store.state.user;
            this.form.user_id = user._id || '';
            if(user.yb){
                this.form.user_head = user.yb.yb_userhead;
            }

            return user;
        },
        // 联动 类别 和 目录
        catologue(){
            const type = this.form.type;
            let catologue = []
            for(let i=0,length=this.type.length;i<length;i++){
                if(this.type[i].title == type){
                    catologue = this.type[i].catologues;
                    break;
                }
            }
            // 不是重新编辑页面时
            if(!this.edit){
                this.form.catologue = '';
            }
            return catologue;
        }
    },
    methods:{
        // 获取 '其他'
        async getType(){

            const data = await getType(this.form.type);
            if(data.status == 'error'){
                this.$message({
                 showClose: true,
                 message: data.msg,
                 type: 'error',
               });
               return ;
            }
            this.type.push(data.data);
            this.loading = false;
        },
        // 获取所有类别
        async getTypes(){

            const data = await getTypes();
            if(data.status == 'error'){
                this.$message({
                 showClose: true,
                 message: data.msg,
                 type: 'error',
               });
               return ;
            }
            this.type = data.data;
            this.loading = false;
        },
        // 重新编辑文章
        async getArticle(){
            const _id = this.$route.params.id;
            const data = await getArticle(_id);

            this.form.title = data.data.title,
            this.form.type = data.data.type,
            this.form.catologue = data.data.catologue,
            this.form.top = data.data.top,
            this.form.user_id = data.data.user_id;
            this.form.user_head = data.data.user_head;
            this.form.content = data.data.content;
            this.img = data.data.img;

            // 图片
            const $vm = this.$refs.md;
            // 如果原始md字符串中存在曾上传的图片， 则需要将对应<img>中的src替换为base64
            this.$nextTick(() => {
                // $vm.$imgUpdateByUrl 详情见本页末尾
                for(let i=0,length = this.img.length;i<length;i++){
                    $vm.$imgUpdateByUrl(i, this.img[i]);

                }

            })

        },

        // 添加图片
       //  $imgAdd(filename, $file){
       //     // 缓存图片信息
       //     this.img[filename] = $file.miniurl;
       // },
       $imgAdd(pos, $file){
           // 第一步.将图片上传到服务器.
          const $vm = this.$refs.md;
          let formdata = new FormData();
          formdata.append('image', $file);
          fileUpload(formdata).then( res =>{
               $vm.$img2Url(pos, res.url);
          })
      },

       // 上传数据
        save(){
         this.$refs["form"].validate((valid) => {
              if (valid) {
                  if(this.config.value == ''){
                      _this.$message({
                       showClose: true,
                       message: '内容不能为空',
                       type: 'error',
                     });
                      return ;
                  }
                  const { form,config,img } = this;
                  let article = {
                      "title":form.title,
                      "type":form.type,
                      "catologue":form.catologue,
                      "content":form.content,
                      "img":img,
                      "user_id":form.user_id,
                      "user_head":form.user_head,
                      "top":form.top
                  }
                  if(this.$route.params.id){
                      article._id = this.$route.params.id;
                      this.updateArticle(article);
                  }else{
                      let _this = this;
                      postArticle(article).then( function(data){
                          if(data.status == 'error'){
                              _this.$message({
                               showClose: true,
                               message: data.msg,
                               type: 'error',
                             });
                             return ;
                         }else{
                             _this.$message({
                              showClose: true,
                              message: '成功',
                              type: 'success',
                            });
                            _this.$router.go(-1);
                         }
                      });
                  }

              } else {
                return false;
              }
            });
        },
        updateArticle(article){
            let _this = this;

            if(!this.user.admin && this.user._id !== article.user_id._id ){
              this.$message({
                message:'您无权编辑!',
                type: 'error',
                duration:1000
              })
            }
            updateArticle(this.$route.params.id,article).then(function(data){
                if(data.status == 'error'){
                    _this.$message({
                     showClose: true,
                     message: data.msg,
                     type: 'error',
                     duration:1000
                   });
                   return ;
               }else{
                   _this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success',
                    duration:1000
                  });
                  _this.$router.go(-1);
               }
            })
        }
    }
}
</script>

<style lang="css" scoped>

</style>
