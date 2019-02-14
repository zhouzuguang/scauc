<template lang="html">

        <el-card>
        <el-row :gutter="40">
            <el-col :span="8" :xs="24">
                <div v-if="user.yb">
                      <img :src="user.yb.yb_userhead" class="sm_img">
                      <p class="right-label">持有网薪:{{user.yb.yb_money}}</p>
                      <p class="right-label">目前经验:{{user.yb.yb_exp}}</p>
                </div>
            </el-col>
            <el-col :span="14" :xs="24">
                    <el-form ref="form"  label-width="80px" v-if="user.yb">
                      <el-form-item label="昵称" >
                        <el-input disabled :value="user.yb.yb_usernick"></el-input>
                      </el-form-item>
                      <el-form-item label="姓名" >
                          <el-input disabled :value="user.yb.yb_username"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" >
                          <template v-if="user.yb.yb_sex == 'M'">
                              <el-input disabled value="男"></el-input>
                          </template>
                          <template v-else>
                              <el-input disabled value="女"></el-input>
                          </template>
                      </el-form-item>
                      <el-form-item label="学校" >
                          <el-input disabled :value="user.yb.yb_schoolname"></el-input>
                      </el-form-item>
                      <el-form-item label="注册时间" >
                          <el-input disabled :value="user.yb.yb_regtime"></el-input>
                      </el-form-item>
                  </el-form>
            </el-col>

        </el-row>
    </el-card>
</template>

<script>
export default {
    name:'User',
    props:{
        user:{
            type:Object
        }
    }
}
</script>


<style lang="css">
@media  screen and (max-width: 700px)  {
    .sm_img{
        width:100px;
        height:100px;
    }
}
</style>
