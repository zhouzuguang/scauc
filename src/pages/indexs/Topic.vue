<template lang="html">
  <div>
      <el-card>
        <Pagenation
            :data="data"
            :page="page"
            :loading="loading"
            @change="change"
        />
      </el-card>
  </div>
</template>

<script>
import {getArticles} from '@/api/articles.js';
import Pagenation from '@/components/Pagenation'
export default {
    components:{
        'Pagenation':Pagenation
    },
    created(){
        this.getArticles();
    },
    watch:{
        '$route':function(){
            if(this.$route.name == 'Topic' && this.$route.params.catologue){
                this.getArticles(this.$route.params.page);
            }
        },
    },
    data(){
        return {
            loading:true,
            data:[],
            page:1
        }
    },
    methods:{
        async getArticles(page){
            this.loading = true;
            page = this.$route.params.page || 1;
            this.page = +page;
            const query = `?type=其他&catologue=${this.$route.params.catologue}&page=${page}&length=15`;
            const data = await getArticles(query);
            if(data.status == 'error'){
                this.$message({
                 showClose: true,
                 message: data.msg,
                 type: 'error',
                 duration:1000
               });
               return ;
            }
            this.data = data.data;
            this.loading = false;

        },
        change(page){
            const {catologue} = this.$route.params;
            this.$router.replace(`/index/${catologue}/${page}`);
        }

    },
    filters:{
        toMuch(val){
            if(val>99999){
                return '10w+';
            }
        }
    }
}
</script>
