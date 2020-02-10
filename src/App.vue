<template>
  <div id="app">
   
    <div class="tabbar" v-show="isLogin && showNav" >
       <ul>
         <li v-for="item in navs" @click="switchTo(item.url)">
           <img :src="item.url === $route.path ? item.activePic : item.pic " alt="item.text" class="">
           <span :class="{active: item.url === $route.path}">{{item.text}}</span>
         </li>        
       </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
   // import pic1 from '@/assets/img/tabbar_gg_f.png'
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data () {
    return {
      showNav:true,
      navs:[
      {
        url:'/home',
        pic:require("./assets/img/tabbar_gg_f.png"),
        activePic:require("./assets/img/tabbar_gg_t.png"),
        text:'悦公告'
      },
      {
        url:'/gift',
        pic:require("./assets/img/tabbar_fl_f.png"),
        activePic:require("./assets/img/tabbar_fl_t.png"),
        text:'悦福利'
      },
      {
        url:'/order',
        pic:require("./assets/img/tabbar_fw_f.png"),
        activePic:require("./assets/img/tabbar_fw_t.png"),
        text:'悦服务'
      },
      {
        url:'/share',
        pic:require("./assets/img/tabbar_fx_f.png"),
        activePic:require("./assets/img/tabbar_fx_t.png"),
        text:'悦分享'
      },
      {
        url:'/me',
        pic:require("./assets/img/tabbar_user_f.png"),
        activePic:require("./assets/img/tabbar_user_t.png"),
        text:'我的'
      }
      ]
    }
  },
  watch:{
    $route( to , from ){         
      let arr = ['/home','/order','/share','/me','/gift','/'];
       // console.log( to.path , from,arr.indexOf(to.path) ,"++++++++++++" )
      
       console.log(to.path,"[[[[")
      if(arr.indexOf(to.path) === -1){
        this.showNav = false;
      } else {
        this.showNav = true;
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
          WeixinJSBridge.call('hideOptionMenu');
        });
      }
    }
  },
 computed:{
    isLogin(){
     
      // console.log(this.$store.getters.isLoggedIn,"++++++++++++++++++++app")
      return this.$store.getters.isLoggedIn
      this.$router.push('/loginIn');
    }
  },
  created(){
    let self = this;
    // alert("app[[[[[[[[[[[[[[[[[[[[[[[");
    // alert(self.showNav);
    // alert(self.isLogin);
    // alert("oooo")
     // console.log("app[[[[[[[[[[[[[[[[[[[[[[[",self.showNav,"pppppppp",self.isLogin);
      this.wx.hideMenuItems({
        menuList: ['menuItem:share:appMessage',"menuItem:share:timeline", "menuItem:copyUrl", "menuItem:openWithQQBrowser", "menuItem:openWithSafari","menuItem:share:email", "menuItem:share:brand","menuItem:originPage"] 
    // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });
      this.wx.hideAllNonBaseMenuItem();
    //   // this.wx.hideOptionMenu()
    
  },
  methods:{
    toban :function() {
      let self = this;
    },
    switchTo(path){
      let self = this;
      // console.log(this.$router,"++++++++++++++++",path)
      this.$router.replace(path);      
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      });
    }
  }
}
</script>
<style lang="less">
  html{
    background:#fff;
  }
@sz:75rem;
.mint-toast {
  // background-color: red !important;
}
.toasts {
  position:absolute;
  background: rgba(0,0,0,0.5) !important;
  color: #fff;
  display: inline-block;
  padding: 10/@sz;
  z-index: 1000;
  margin: 0 auto;


}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  border-bottom:1px solid #ECECEC;
}
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #F33D2B ;
    background:  #F33D2B;
  }
  .el-radio-group, .el-radio{
    line-height: 80/@sz;
    vertical-align:inherit;
  }
  .el-radio__inner{
    width:36/@sz !important;;
    height: 36/@sz !important;


  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #F33D2B;
}

.el-input {
   width: 420/@sz!important;
   height: 60/@sz;
   padding:0;
   font-size: 28/@sz;
   background:rgba(250,250,250,0);
}
.el-input .el-input__inner {
    width: 420/@sz!important;
    height: 60/@sz;
    border:none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background:rgba(250,250,250,0);
}
.el-range-editor--small.el-input__inner{
  width: 420/@sz!important;
  border:none;
}
.color_red{
  color:#F8655E;
  // cursor: pointer;
}
.color_999{
  color:#999;
}
.color_blue{
   color: #079DEB;
  // cursor: pointer;
}
</style>
<style lang= 'less'>
@sz:75rem;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(252,252,252,1);
  padding-bottom:120/@sz;
  .tabbar{
    position: fixed;
    z-index: 10;
    height: 120/@sz;
    width: 100%;
    bottom:0;
    left:0;
    right: 0;
    background: #fff;
    ul{
      position:relative;
      height: 120/@sz;
      width: 100%;
      border-top:1/@sz solid #E2E2E2;
      li{
        display: block;
        float: left;
        width: 20%;
        height: 120/@sz;
        text-align: center;
        vertical-align: middle;
        padding-top: 20/@sz;

        img{
          display: inline-block;
          width: 40/@sz;
          height: 40/@sz;
          
        }
        span{
          display: block;
          height: 40/@sz;
          line-height: 40/@sz;
          
          margin-top: 10/@sz;
        }
        .npactive{
          color: #666;
        }
        .active{
          color: #FC5B59;

        }
      }
    }
  }
}
</style>
