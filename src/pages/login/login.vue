<template>
  <div class="login">
    <div class="logoPic ">
      <img :src="pic">
    </div>
    <div class="piceBox hasBor">
      <el-input v-model="hrCode" placeholder="请输入HRcode" no-border></el-input>
    </div>
     <div class="sunBtn" @click="toLogin">
      登陆
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
export default {
   name:'home',
    data(){
      return {
        pic:require('../../assets/img/loginPic.png'),
        hrCode:''
      }
  },
  methods:{
    //login登录方法
 
    toLogin(){
      let self = this;
      let param = this.qs.stringify({
        hrCode :self.hrCode
      });
      this.$store.dispatch('Login', param)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((error) => {
          console.log(error.response,"kdkdkdkdh"); 
        });
     
    },
  }
}

</script>
<style lang="less">
@sz:75rem;
html{
    background: #fff;
}

.el-input, .el-input .el-input__inner {
    border:none;
}
</style>
<style scoped lang ="less">
@sz :75rem;
.login{
  position:relative;
  width: 100%;
  height:auto;
  background:#fff;
  padding-bottom:100/@sz;
  .logoPic{
    position:relative;
    width: 180/@sz;
    height: 180/@sz;
    margin:100/@sz auto 60/@sz;
    img{
      width: 100%;
      height: auto;
    }
  }
  .piceBox{
    width: 660/@sz;
    position: relative;
    text-align: left;
    height: 98/@sz;
    line-height: 98/@sz;
    font-size: 32/@sz;
    padding:-10/@sz 0/@sz;
    margin: 0 auto 50/@sz;
    span{
      display: inline-block;
      width: 140/@sz;

    }
  }
  .hasBor{
    border: 1px solid rgba(238,238,238,1);
    background:#F2F2F2;
  }
  .sunBtn{
    width:690/@sz;
    height: 98/@sz;
    margin: 0 auto;
    background:linear-gradient(90deg,rgba(241,115,99,1) 0%,rgba(254,88,88,1) 100%);
    box-shadow:0px 4px 15px rgba(243,61,43,0.41);
    border-radius:10px;
    color: #fff;
    line-height: 98/@sz;
    font-size: 32/@sz;
  }
}
</style>