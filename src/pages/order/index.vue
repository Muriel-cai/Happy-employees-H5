<template>
  <div class="order">
    <partList :partList ="orderData" @tolinks="tolinks"></partList>
  </div>
</template>
<script>
  import partList from '../../components/partList'
  import { Toast } from 'mint-ui'
  export default {
    name:'order',
    data(){
      return {
        hrcode:'',
        orderData: [
          {
            title:'疗休养',
            destext:'疗休养报名',
            picurl:require('../../assets/img/icon_liaoxiuyang.png'),
            links:"/lxybm"
          },
          {
            title:'体检',
            destext:'年度体检福利',
            picurl:require('../../assets/img/icon_tijian.png'),
            links:"/physical"
          },
          {
            title:'电话医生',
            destext:'在线问诊医生电话回访',
            picurl:require('../../assets/img/icon_doctor.png'),
            links:"/phoneYy"
          }
        ],
        isTime:'',
        endTime:'',
        startTime:'',
        type:'1',
        enterTime:''
      };
    },
    components: {
     partList:partList
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');

      // this.axios.post('/api/wxqQueryUserByPhone',this.qs.stringify({
      //   phone:'18710000000'
      // })
      // ).then(res=>{
      //   console.log(res)
      // }).catch(ret => {
      //   console.log(ret)
      // })
    },
    methods:{
      tolinks:function(option){
        let self = this;
        let url ;
        console.log("ppppp",option);
        if(option == '/lxybm') {
          url = '/api/wxQueryLxyUserByHrCode';  
          self.type = 1;
        } else if(option == '/physical'){
          url = '/api/wxQueryTjUserByHrCode';
          self.type = 2;
        }else if(option == '/phoneYy'){
          self.$router.push({'path':option});
           self.type = 3;
        };
        if(self.type ==1 || self.type == 2 ){
        this.axios.post('/api/queryCultureTime',
            this.qs.stringify({
              type:self.type
            })
          ).then(function(res){
            // console.log(res.data.data,"时间")
            self.endTime = res.data.data.CultureEndTime;  
            self.startTime = res.data.data.CultureStartTime;
            self.enterTime = res.data.data.ParticipantTime;    
          }).then(function(){
            let thisendTime = self.endTime;
            let timestamp = Date.parse(new Date())
            thisendTime = thisendTime.replace(/-/g, '/');
            var  fstartsTime = new Date(self.startTime.replace(/-/g, '/'));
            var finTime = new Date(thisendTime);
            fstartsTime = fstartsTime.getTime();
            finTime = finTime.getTime();
            // console.log(finTime > timestamp,"判断",timestamp>fstartsTime)
            if(finTime > timestamp && timestamp>fstartsTime){
              self.isTime = true
            } else {
              self.isTime = false
            }
          }).then( function(){
            // console.log(self.isTime,"isTime")
            if(self.isTime) {
              self.axios.post(url,self.qs.stringify({
                hrCode:self.hrcode,
                non_type:self.type,
                ParticipantTime:self.enterTime 

              })).then(res=>{
                // console.log(res, "jddddddd判断报名");
                if(res.data.status == "200"){
                  // console.log(option,"pppppppppppppppppp+++++++++++")
                  self.$router.push({'path':option})
                 } else if(res.data.status == "300"){
                    Toast({
                      message: '您已报名过啦！',
                      position: 'middle',
                      duration: 800,
                      className: 'toasts'
                    });
                 }else if(res.data.status == "400"){
                    Toast({
                      message: '您暂时不可参与！',
                      position: 'middle',
                      duration: 800,
                      className: 'toasts'
                    });
                 } else if(res.data.status == "100"){
                    Toast({
                      message: '您暂时不可参与！',
                      position: 'middle',
                      duration: 800,
                      className: 'toasts'
                    });
                 }  
              })
            } else {
              Toast({
                message: '不在报名时间段！',
                position: 'middle',
                duration: 800,
                className: 'toasts'
              });
            }
            
          }).catch(function(ret){
            console.log(ret)
          });
        }       
      },
      
    },
   
    // async beforeCreate(){
    //   this.data = (await (await fetch("/api/house/get")).json()).data;
    //   this.$parent.footer = MyFooter;
    // }
  }
</script>
<style scoped lang="less">
@sz:75rem;
  .order{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 30/@sz;
  }
</style>
