<template>
  <div class="noodle">
  <!-- <topTitle :title="title"></topTitle> -->
  <div class="zsmbox">
    <div class="infoBox">
      <div class="info">
        <span>姓名:{{name}} </span>  
        <span> 生日:{{birthday}}</span>    
        <span> 生日面剩余次数:{{noodleNum}}</span>
      </div>
     
      <p> 部门:{{branch}}</p>

    </div>
    <div id = "qrcode"></div>
    <p class="noticeT"> 使用时请出示该码给工作人员，请勿自行 扫描或泄露给他人以免被误用</p>
  </div>
    
  </div>
</template>
<script>
  import topTitle from '../../components/toptitle' 
  import QRCode from 'qrcodejs2'
  // import hasSelect from './components/hasSelect'
  export default {
    name:'noodle',
    data(){
      return {
       title:"生日面",
       name:"",
       branch:'',
       phone:'',
       birthday:'',
       noodleNum:1,
       hrcode:'',
      };
    },
    components: {
      topTitle : topTitle
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');
      // console.log(this.$router.options.routes[5].children[0].path,"[[[kk")
      // this.tobranch = this.$router.options.routes[5].children[0].path;
      // console.log(this.$store,"dkkkkkkkk")
      this.axios.post('/api/getWelfare',this.qs.stringify({
        hrCode:self.hrcode,
        type:1
      })).then(res=>{
        console.log(res.data,1111111111111111);
        self.name = res.data.userName;
        self.branch = res.data.deptName;
        self.noodleNum = res.data.birthdayNum;
        self.birthday = this.setSelectName.formatDate(res.data.birthday);
        
      }).catch(ret=>{
        console.log(ret)
      })
    },
    mounted(){
      this.qrcode();
      this.text();
    },
    methods:{
      qrcode(){
        let self = this;
        console.log(self.hrcode)
        let qrcode = new QRCode('qrcode',{
          width:220,
          height:220,
          text:'http://gh.picczj.com/index.html#/code?hrcode='+self.hrcode+'&type=1',
          coloeDark :"#000",
          colorLight:"#fff"

        })
      },
      text (){
        let self = this;
        let str = '{"name": "张珊", "电话" : " 13584561220"}';
        let arr =  JSON.parse(str);
        console.log(arr);
      },
      format (time){
        let self = this;
        let timeD = new Date(time);
        console.log(timeD,"++++++++++++++++++");
      }
    }
    
  }
</script>
<style scoped lang="less">
@sz:75rem;
.zsmbox{
  position: relative;
  width: 690/@sz;
  height: 970/@sz;
  margin: 0 auto;
  background: #fff;box-shadow:0px 1px 15px rgba(0,0,0,0.06);
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
      text-indent: 0px;
    }
  }
  .noticeT{
     width: 100%;
     height: auto;
     padding: 50/@sz;
     line-height: 50/@sz;
     color:#666;
     font-size: 32/@sz;
     text-align: center; 

  }
}
  #qrcode {
    display: inline-block;
    img {
      width: 132px;
      height: 132px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
    }
  }

</style>