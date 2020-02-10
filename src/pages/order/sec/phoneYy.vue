<template>
  <div class="lxybm">
    <!-- <topTitle :title="title"></topTitle> -->
    <div class="tabNav">

      <router-link  :class="[ 'p' ,{ tabactive :cur == 1}]" @click="cur = 0" to="/phoneYy/apply">
        申请
      </router-link />
      <router-link :class="[ 'p' ,{ tabactive :cur == 1}]" @click="cur = 1"  to="/phoneYy/record">
        记录
      </router-link />
    </div>
   
    <router-view></router-view>
  </div>
</template>
<script>
  import topTitle from '../../../components/toptitle'
  
  export default {
    name:'lxybm',
    data(){
      return {
       title:"电话医生", 
       cur:'1'   
      };
    },
    watch:{
      cur(val){
        console.log(val,"culr")
      }

    },
    components: {
      topTitle : topTitle
    },
    created(){
     let self = this;
     console.log(self.cur)
    },
    methods:{
    
    }
   
  }
</script>
<style lang="less">
   @sz:75rem;
  .router-link-active {
    color: #F7655D;
    border-bottom: 4/@sz solid #F7655D!important;
}
</style>
<style scoped lang="less">
  @sz:75rem;
  .tabNav{
    width: 100%;
    height: 98/@sz;
    background: #fff;
    .p{
      display: block;
      width: 50%;
      float: left;  
      text-align: center; 
      height:98/@sz;
      line-height: 98/@sz;
      font-size: 32/@sz; 
      
      .tabactive{
        color: #F7655D;
        border-bottom: 4/@sz solid #F7655D;
      }
    }
  }
 
</style>