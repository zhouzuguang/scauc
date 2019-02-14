<template lang="html">
  <div>
    <iframe :src="loginUrl" style="width:100%;" class="loginMod" id="loginIframe" scrolling="no"></iframe>
  </div>
</template>

<script>
import { loginUrl } from '@/config'
export default {
    data(){
      return {
        loginUrl:loginUrl
      }
    }
}
</script>

<style lang="css">
.loginMod{
  width:100%;
  height:700px;
  overflow: hidden;
  border: none
}
@media  screen and (max-width: 700px)  {
  .loginMod{
    height:700px;
  }
}
</style>
