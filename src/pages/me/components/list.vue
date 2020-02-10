<template>
  <div class="list">
   <router-link :to="url" class="branch" :style="{ backgroundImage:'url('+ coverImage +')'}" @click="hasSelect">
     {{leftT}} <span>{{rightT}}</span>
   </router-link>
  </div>
</template>
<script>
 
  export default {
    props:["url",'coverImage','leftT', 'rightT','getSelect'],
    name:'list',
    data(){
      return {
     
      };
    },
    components: {
     
    },
    methods:{
      hasSelect(){
        this.$emit('getSelect')
      }
    }

    // async beforeCreate(){
    //   this.data = (await (await fetch("/api/house/get")).json()).data;
    //   this.$parent.footer = MyFooter;
    // }
  }
</script>
<style scoped lang="less">
@sz:75rem;
  .branch{
    position: relative;
    display: block;
    width: 690/@sz;
    height: 100/@sz;
    padding-left: 85/@sz;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 15px rgba(0,0,0,0.06);
    border-radius:8px;
    margin:0 auto;
    margin-bottom: 40/@sz;
    background-position: left 30/@sz center;
    background-repeat:no-repeat;
    background-size:36/@sz 36/@sz;
    text-align: left;
    font-size: 32/@sz;
    color: #333;
    line-height: 100/@sz;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right:80/@sz;
    span{
      position: absolute;
      right:0;
      bottom:25/@sz;
      font-size: 28/@sz;
      padding-right:30/@sz;
      line-height: 50/@sz;
    }
  }
</style>
