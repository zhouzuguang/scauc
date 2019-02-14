<template>
  <div id="app">
    <router-view v-if="$route.name == 'Login' " />

    <div v-else>
      <keep-alive>
          <el-row style="background:rgb(73, 80, 96)">
              <el-col :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.lg" :xl="layout.xl"  >
                  <Header />
              </el-col>
          </el-row>
      </keep-alive>

      <keep-alive>
          <el-col  :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.lg" :xl="layout.xl">
                  <router-view  />
          </el-col>
     </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
export default {
  name: 'App',
  components:{
      Header
  },
  data(){
      return {
          layout:{
             xs:{
                 span:24
             },
             sm:{
                 span:24
             },
             md:{

                 span:24
             },
             lg:{
                 offset:4,
                 span:16
             },
             xl:{
                 offset:4,
                 span:16
             }
          }
      }
  }
}
</script>

<style  lang="css">
body{
    padding:0;
    margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
  overflow-x: hidden;
}
.pagerContent{
    text-align: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.pagerContent>a{
    font-size:14px
}
@media  screen and (max-width: 700px)  {
    .sm_display{
        display: none;
    },
    .my-menu-2>li{
        font-size:12px
    }
    .el-menu-item{
        font-size:12px
    }
    .pagerContent{
        font-size:12px;
    }
    .pagerContent>a{
        font-size:12px;
    }
}


a{
    color:#001;
    font-size:14px;
    text-decoration: none;
}
a:hover{
    color:#409EFF;
    text-decoration: underline;
}

.my-list{
    width:100%;
    margin:0;
    padding:0;
    height:40px;
    line-height: 40px;
    text-align: center;
    clear:both;
}
.my-list:hover{
        background: #dfdfdf;
}

.title{
    text-align: left;
    margin-left:10px
}

.divide{
    width:100%;
    height: 2px;
    border:none;
    background: #409EFF;
    margin:20px 0;
    -webkit-animation:hr 5s linear 1;
    animation: hr 5s linear 1;
}

@keyframes  hr{
    0% {
        width:0
    }

    100% {
        width:100%
    }
}


</style>
