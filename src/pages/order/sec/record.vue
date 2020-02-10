<template>
  <div class="record">
    <div class="recordBox">
      <ul>
        <li v-for="(item ,index) in recordData" >
          <p>问诊人姓名：{{item.wz_name}} 
            <span class="wzstate" v-if="item.wz_state == 1">  已申请 </span>
            <span class="wzstate" v-if="item.wz_state == 2">  已处理 </span>
            <span class="wzstate" v-if="item.wz_state == 3">  已完成 </span>
            <span class="wzstate" v-if="item.wz_state == 4">  已评价 </span>
            <span class="wzstate" v-if="item.wz_state == 5">  已退回 </span>
          </p>
          <p>性别 ：   {{item.wz_gender}}</p>
          <p>问诊人是否您本人 ：{{item.wz_relation}}</p>
          <p>希望问诊时间 ： {{item.wz_time}}</p>
          <p>是否就医 ： {{item.is_seek}}</p>
          <p>症状描述 ： {{item.wz_description}}</p>
          
          <div v-if="item.wz_state == 3">
            <p @click="dialogFormVisible = true ; rateId = item.wzid">评价 ：<span class="color_blue"> 点击评价 </span> </p>

          </div>
          <div v-if="item.wz_state == 4">
            <p>评价 ： 
              <span class="rateSpan">  <el-rate
                  v-model="item.wz_evaluate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </span>
            </p>

          </div>

        </li>
      </ul>
    </div>
    <!--评价的弹框-->
     <el-dialog
      title="评分"
      :visible.sync="dialogFormVisible"
      width="80%"
      top = "10vh"
      center
      >
        <h2 class="rateText">请对本次问诊服务做出评价</h2>
        <div class="rateBox">
           <el-rate v-model="rateNum"></el-rate>
        </div>
       
        <div>
          <el-button type="" @click="cancle">取消</el-button>
          <el-button type="success" @click="getRate">确定</el-button>
        </div>
        
    </el-dialog>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    inject:['reload'],
    name:'record',
    data(){
      return {
        hrcode:'',
        recordData:[],
        dialogFormVisible:false,
        rateNum:0,
        rateId:''
      };
    },
    components: {
     
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');
      this.axios.post('/api/wxGetTpdoctorNumByUserId',this.qs.stringify({
        hrCode:self.hrcode 
      })).then(res=>{
        console.log(res.data.data);
        self.recordData = res.data.data;
      }).catch(ret =>{
        console.log(ret)
      })
    },
    methods:{
      getDes(des){
        console.log(des)
      },
      getRate(){
        let self = this;
        self.dialogFormVisible = false;
        console.log(self.rateNum,"getRate",self.rateId);
        this.axios.post('/api/wxUpdateEvaluateByWzId',this.qs.stringify({
          wzid: self.rateId,
          wzEvaluate: self.rateNum
        })).then(res=>{
          console.log(res.data.status);         
          self.reload();
          if(res.data.status == 200){
            Toast({
              message: '评分成功！',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });
          }
          
        }).catch(ret =>{
          console.log(ret)
        })
      },
      cancle(){
        let self = this;
        self.dialogFormVisible = false;
      }
    }
   
  }
</script>
<style lang="less">
@sz:75rem;
.el-dialog--center .el-dialog__body {
    text-align: center;
    padding: 5px 25px 30px;
}
</style>
<style scoped lang="less">
  @sz:75rem;
  .recordBox{
    width: 710/@sz;
    margin:20/@sz auto 50/@sz;
    ul{
      position: relative;
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: auto;
        padding: 10/@sz 26/@sz;
        margin-bottom: 0.53333333rem;
        background: #ffffff;
        -webkit-box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        p{
          text-indent: 0;
          line-height: 50/@sz;
          padding:8/@sz 0;
          text-align: left;
          font-size: 32/@sz;
          color: #333;
          .rateSpan{
            display: inline-block;
            width: 70%;
          }
        }
      }
    }
  }
  .rateText{
    width: 100%;
    line-height: 60/@sz;
    font-weight: normal;
    font-size:32/@sz; 
  }
  .rateBox{
    padding:15/@sz 0 30/@sz;

  }
  .no-border{
    border:none;
  }
  .sunBtn{
    width:690/@sz;
    height: 98/@sz;
    margin: 0 auto;
    background:linear-gradient(90deg,rgba(241,115,99,1) 0%,rgba(254,88,88,1) 100%);
    box-shadow:0px 4px 15px rgba(243,61,43,0.41);
    border-radius:10px;
    color: #fff;
    line-height: 98/@sz;
    font-size: 32/@sz;
  }
  .wzstate{
    display: inline-block;
    float: right;
    color:#F7655D;
  }
</style>