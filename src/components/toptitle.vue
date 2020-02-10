<template>
  <div>
      <div class="topbox">
        <span class="toBack" @click="toback"></span>
        {{title}}
      </div>
  </div>
</template>
<script>
 
  export default {
    props:['title'],
    name:'toptitle',
    data(){
      return {
      
      };
    },
    methods:{
      toback:function(){
        let self = this;
        self.$router.go(-1);
      }
    } 
  }
</script>
<style scoped lang="less">
@sz:75rem;
.topbox{
  position: relative;
  width: 100%;
  height: 100/@sz;
  line-height: 100/@sz;
  font-weight:bold;
  font-size: 32/@sz;
  background:rgba(245,245,245,1);
  .toBack{
    position:absolute;
    left:30/@sz;
    display: block;
    height: 40/@sz;
    width: 40/@sz;
    top:30/@sz;
    background: url(../assets/img/return.png) center center;
    background-size:40/@sz 40/@sz;
  }
}
</style>