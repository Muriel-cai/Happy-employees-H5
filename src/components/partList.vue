<template>
  <div>
    <div v-for="(item, index) in partList" :key="index"  class="partList" @click="toLink(item.links,item.type)">
      <div class="lefttext">
        <h1>{{item.title}}</h1>
        <p>{{item.destext}}</p>
      </div>
      <div class="picbox">
        <img :src="item.picurl">
      </div>  
    </div>
  </div> 
</template>
<script>
  export default {
    props:['partList','tolinks'],
    name:'partList',
    data(){
      return {
      
      };
    },
    methods:{
      toLink:function(option,type){
        let self = this;
        // console.log(option,"url")
        this.$emit('tolinks',option,type)
      }
    }  
  }
</script>
<style scoped lang="less">
@sz:75rem;
  .partList{
   position:relative;
   width: 690/@sz;
   height: 230/@sz;
   padding:15/@sz 20/@sz;
   margin:0 auto;
   margin-bottom: 40/@sz;
   background:rgba(255,255,255,1);
   box-shadow:0px 1px 15px rgba(0,0,0,0.06);
   border-radius:10px;
   .lefttext{
     width: 600/@sz;
     height: 200/@sz;
     float: left;
     padding:40/@sz ;
     text-align: left;
     h1{
      height: 80/@sz;
      line-height: 80/@sz;
      font-size: 42/@sz;
      color: #333333;      
     }
     p{
       height: 40/@sz;
       line-height: 40/@sz;
       font-size: 28/@sz;
       color: #666;
       text-indent: 0;
     }
   }
   .picbox{
    position:absolute;
    width: 200/@sz;
    height: 200/@sz;
    bottom:0;
    right:0;
    float: right;
   }
  }

</style>