<template>
  <div class="gift">
  
   <!-- <partList :title="shopingT" :destext ="shoptext" :picurl =" shopbg"></partList> -->
   <partList :partList="tabdata" @tolinks="tolinks"></partList>
  </div>
</template>
<script>
 import partList from '../../components/partList'
  export default {
    name:'gift',
    data(){
      return {
        tabdata:[
          {
            title:'商城',
            destext:'专享福利商城',
            picurl:require('../../assets/img/icon_shop.png'),
            links:"",
            type:'1'
          },
          {
            title:'生日面',
            destext:'员工专属生日福利',
            picurl:require('../../assets/img/icon_birthday.png'),
            links:"/noodle",
            type:'2'
          },
          {
            title:'理疗',
            destext:'专享理疗服务',
            picurl:require('../../assets/img/icon_liliao.png'),
            links:"/recuperation",
            type:'2'
          }
        ]
        // shopingT:'',
        // shoptext:'',
        // shopbg:require('../../assets/img/icon_shop.png')
       
      };
    },
    created(){
      let self = this;
      this.axios.post('/api/getMall').then(res=>{
        console.log(res.data.data,"self.tabdata[0]");
        self.tabdata[0].links = res.data.data.ruleValue;
      }).catch(ret=>{
        console.log(ret)
      })

    },
    components: {
     partList:partList
    },
    methods:{
      tolinks:function(option,type){
        if(type == 2){
          this.$router.push({'path':option})
        } else if(type == 1){
          console.log(option)
          window.open(option,'_blank');
        } 
      }
    // async beforeCreate(){
    //   this.data = (await (await fetch("/api/house/get")).json()).data;
    //   this.$parent.footer = MyFooter;
    // }
    }
  }
</script>
<style scoped lang="less">
@sz:75rem;
  .gift{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 30/@sz;
  }
</style>