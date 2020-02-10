<template>
  <div class="lxybm">
    <!-- <topTitle :title="title"></topTitle> -->
    <div class="tabNav">
      <p><span class="tabactive">申请</span></p>
      <p><span >记录</span></p>
    </div>
   
   <router-view/>
  </div>
</template>
<script>
  import topTitle from '../../components/toptitle'
  export default {
    name:'lxybm',
    data(){
      return {
       title:"电话医生",      
      };
    },
    components: {
      topTitle : topTitle
    },
    created(){
     
    },
    methods:{
    
    }
   
  }
</script>
<style scoped lang="less">
  @sz:75rem;
  .tabNav{
    width: 100%;
    height: 98/@sz;
    background: #fff;
    p{
      display: block;
      width: 50%;
      float: left;  
      text-align: center; 
      span{    
        height:98/@sz;
        display: inline-block;   
        line-height: 90/@sz;
        font-size: 32/@sz; 

      }
      .tabactive{
        color: #F7655D;
        border-bottom: 4/@sz solid #F7655D;
      }
    }
  }
 
</style>