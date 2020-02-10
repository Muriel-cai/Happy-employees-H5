<template>
  <div class="loginIn" v-if= 'ifFirst && showit'>
    <div class="logoPic ">
      <img :src="pic">
    </div>
    <h2 class="hyText">欢迎您 【{{userName}} 】</h2>
    <h6 class="login_nt color_999">5秒后自动跳转到首页</h6>
    <h6 class="color_red login_nt" @click="toOrder">点击跳转</h6>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
export default {
   name:'loginIn',
    data(){
      return {
        pic:require('../../assets/img/loginPic.png'),
        hrCode:'',
        userName:'',
        ifFirst:false,
        showit:false
      }
  },
  created(){
    let self = this;
    console.log(this.$route.query.hrcode);
    let param = this.qs.stringify({
      hrCode :this.$route.query.hrcode
    });
    this.$store.dispatch('Login', param).then((res) => {
      console.log(res.data);
      self.userName = res.data.data.userName;
      if(res.data.statusText == "ok") {
        this.$router.push({'path':'/'});
      } else {
        self.ifFirst = true;
        self.showit = true;
        setTimeout(() => {
          this.$router.push({'path':'/'});
        }, 5000);
      }
      
        // this.$router.push({ path: '/' });
    })
    .catch((error) => {
        console.log(error.response,"kdkdkdkdh"); 
    });
   
    
  },
  methods:{
    //login登录方法
    toOrder(){
      this.$router.push({'path':'order'}); 
    }
   
     
  }
}

</script>
<style lang="less">
@sz:75rem;
html{
    background: #fff;
}
</style>
<style scoped lang ="less">
@sz :75rem;
.loginIn{
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
  .hyText{
    text-align: center;
    width:100%;
    height:100/@sz;
    font-size:32/@sz;
    font-weight:500;
    line-height:100/@sz;
    color:#333;
  }
  .login_nt{
    width:100%;
    height:60/@sz;
    font-size:28/@sz;
    font-weight:500;
    line-height:60/@sz;
    text-align: center;
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