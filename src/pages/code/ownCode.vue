<template>
  <div class="zsm">
  <div class="zsmbox">
    <div class="infoBox">
      <!-- <p> </p> -->
      <div class="info">
         <span > 姓名:{{name}}</span>
         <span > 生日:{{birthday}}</span>
      </div>
      <div class="info">
         <span v-if="isnoddel"> 生日面剩余次数:{{noodleNum}}</span>
         <span v-if="isln" > 理疗剩余次数:{{surplusNum}}</span>
      </div>
      <p> 部门:{{branch}}</p>
    </div>
    <div class="piceBox hasBor">
      <el-input v-model="code" placeholder="请输入使用码"></el-input>
    </div>
     <div class="sunBtn" @click="hasUse">
      确认使用
    </div>

    <p class="noticeT" >温馨提示 ：</br> 该功能限工作人员请输入使用码操作使用，请勿泄露该使用码，如有疑问请联系相关系统管理人员</p>
  </div>
    
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import topTitle from '../../components/toptitle'
  export default {
    name:'zsm',
    data(){
      return {
       title:"专属码",
       name:"",
       branch:'',
       branchId:"",
       phone:'13584561220',
       noodleNum:'',
       surplusNum:"",
       birthday:"",
       hrcode:'',
       code:'',
       type:1,
       isnoddel:false,
       isln:false
      };
    },
    components: {
      topTitle : topTitle
    },
    created(){
      let self = this;
      // alert("code页啊");
      // alert(this.$route.query.type);
      // alert(this.$route.query.hrcode);
      self.hrcode = this.$route.query.hrcode;
      self.type = this.$route.query.type;
      console.log(self.type,typeof(self.type))
      switch(self.type){
        case '1':
          self.isnoddel = true;
          self.isln = false;
          break;
        case '2':
          self.isln = true;
          self.isnoddel = false;
          break;
        case '3':
          self.isnoddel = true;
          self.isln = true;
          break;
      }
      this.axios.post('/api/getWelfare',this.qs.stringify({
        hrCode:self.hrcode,
        type :self.type
      })).then(res=>{
        console.log(res.data)
        self.name =res.data.userName;
        self.branch = res.data.deptName;
        self.noodleNum = res.data.birthdayNum;
        self.surplusNum = res.data.phtNum;
        self.birthday = this.setSelectName.formatDate(res.data.birthday);
      }).catch(ret =>{
        console.log(ret)
      })
    },
    mounted(){
      // this.qrcode();
      // this.text();
    },
    methods:{
      hasUse(){
        let self = this;
        if(self.code==''){
          Toast({
            message: '使用码不能为空',
            position: 'middle',
            duration: 1000,
            className: 'toasts'
          });
          return false;
        }
        this.axios.post('/api/addWelfare',this.qs.stringify({
          hrCode:self.hrcode,
          type:self.type,
          ruleValue:self.code
        })).then(res=>{
          if(res.data.statusText =='notEquals') {
            Toast({
              message: '使用码错误，请重新输入！',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });
          } else if(res.data.statusText =='false') {
            Toast({
              message: '您的福利次数已使用完！',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });
          } else if(res.data.statusText =='ok') {
            Toast({
              message: '使用成功！',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });
          }
          console.log();
          
        }).catch(ret=>{
          console.log(ret)
        })
      }
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
<style scoped lang="less">
@sz:75rem;
.zsmbox{
  position: relative;
  width: 690/@sz;
  height: 970/@sz;
  margin: 0 auto;
  background: #fff;
  box-shadow:0px 1px 15px rgba(0,0,0,0.06);
  border-radius:12px;
  .infoBox{
    position:relative;
    padding : 40/@sz 30/@sz 30/@sz 40/@sz;
    .info{    
      display: -webkit-flex;
      display: flex;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-align-content: center;
      width: 100%;
      height: auto;
      text-indent: 0;
     
      text-align: left;
      span{
        display: inline-block;
        width: 50%;
        text-align: left;
        line-height:65/@sz;
        font-size: 32/@sz;
      }
    }
    p{
      width: 100%;
      text-align: left;
      line-height:65/@sz;
      font-size: 32/@sz;
      text-indent: 0;
    }
  }
  .noticeT{
     width: 100%;
     height: auto;
     padding: 50/@sz;
     line-height: 50/@sz;
     color:#666;
     font-size: 32/@sz;
     text-align: left; 
     text-indent: 0;
  }
}
.piceBox{
    width:580/@sz;
    position: relative;
    text-align: left;
    height: 98/@sz;
    line-height: 98/@sz;
    font-size: 32/@sz;
    padding:-10/@sz 0/@sz;
    margin: 0 auto 30/@sz;
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
    width:580/@sz;
    height: 88/@sz;
    margin: 0 auto;
    background:linear-gradient(90deg,rgba(241,115,99,1) 0%,rgba(254,88,88,1) 100%);
    box-shadow:0px 4px 15px rgba(243,61,43,0.41);
    border-radius:10px;
    color: #fff;
    line-height: 88/@sz;
    font-size: 32/@sz;
  } 
  .no-border{
    border:none;
  }
</style>