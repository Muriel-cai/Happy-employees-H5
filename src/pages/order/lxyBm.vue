<template>
  <div class="lxybm">
    <!-- <topTitle :title="title"></topTitle> -->
    <p class="endTime" v-show="hastime">报名截止时间 ： {{endTime}}</p>
    <div class="lxybox">
      <div class="piceBox no-border">
        <span class="leftText">省内外</span>
        <el-radio-group v-model="identity" >
          <el-radio label="1" size="medium">省内</el-radio>
          <el-radio label="2" size="medium ">省外</el-radio>
        </el-radio-group>
      </div>
      <div class="piceBox">
        <span class="leftText">部门</span>
        <el-input v-model="branch" @focus="showBm"></el-input>
      </div>
      <div class="piceBox">
        <span class="leftText">姓名</span>
        <el-input v-model="userName" ></el-input>
      </div>
      <div class="piceBox ">
        <span class="leftText">性别</span>
        <el-radio-group v-model="gender" >
          <el-radio label="1" size="medium">男</el-radio>
          <el-radio label="2" size="medium ">女</el-radio>
        </el-radio-group>
      </div>
      <div class="piceBox">
        <span class="leftText">身份证号</span>
        <el-input v-model="IDnum" ></el-input>
      </div>
      <div class="piceBox">
        <span class="leftText">手机号</span>
        <el-input v-model="phonenum" ></el-input>
      </div>
      <div class="piceBox no-border">
        <span class="leftText">备注</span>
        <el-input v-model="remarks" placeholder="请输入"></el-input>
       
      </div>
    </div>
    <div class="sunBtn" @click="submit">
      确认提交
    </div>

    <!--选择部门的底部弹出框-->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      closeOnClickModal="true"
      >
      <mt-picker :slots="dateSlots"  class="bomBox" showToolbar ref="picker" valueKey="name">
         <div class="picker-toolbar-title">
             <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
             <div class="">请选择部门</div>
             <div class="usi-btn-sure" @click="changeDet">确定</div>
         </div>
        <!--  <div class="optionBox">
           <p v-for="(item , index) in maritalOption" @click="getMaritalId(item.cateId,item.cateName)">
              {{item.cateName}}
           </p>
          
         </div> -->
     </mt-picker>      
    </mt-popup>

  </div>
</template>
<script>
  import topTitle from '../../components/toptitle'
  import { Toast } from 'mint-ui'
 
  export default {
    name:'lxybm',
    data(){
      return {
       title:"疗休养报名",
       hrcode:'',
       hastime:true,
       endTime:"",
       identity:'1',
       whichBm:'',
       branch:"",
       branchId:'',
       userName:'',
       gender:'',
       IDnum:"330100200010101212",
       phonenum:"",
       remarks:'',
       userid:'',
       popupVisible:false,
       dateSlots:[
        {values:[

        ]}
       ],
      };
    },
    components: {
      topTitle : topTitle
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');
      this.axios.post('/api/wxQueryUserByphone',this.qs.stringify({
        hrCode:self.hrcode
      })
      ).then(res=>{
        self.branch = this.setSelectName.dutiesCodeText(res.data.data.user_dept) ;
        self.branchId = res.data.data.user_dept;
        self.userName = res.data.data.user_name;
        self.gender = res.data.data.gender;
        self.IDnum = res.data.data.IDcode;
        self.phonenum = res.data.data.phone;
        self.userid  = res.data.data.user_id;
      }).then(res=>{
        this.axios.post('/api/queryCultureTime',
          this.qs.stringify({
            type:1
          })
        ).then(function(res){
          // console.log(res.data.data.CultureEndTime,"时间")
          self.endTime = res.data.data.CultureEndTime;
        }).catch(function(ret){
          console.log(ret)
        })
      })
    },
    methods:{
      showBm(){
        let self = this;      
        self.popupVisible = true;
        document.activeElement.blur();
        this.axios.post('/api/wxGetCategoryById',
          this.qs.stringify({
            cateParentId:'200'
          })
          ).then(res=>{
            // console.log(res.data.data);
            res.data.data.forEach(function(value,index,arr){
              let arrs = {
                name:value.cateName,
                value:value.cateId
              };
              self.dateSlots[0].values.push(arrs)
            })
          }).catch(ret=>{
            console.log(ret)
          })
      },
      onValuesChange(picker, values) {
        let self = this;
        
        // if (values[0] > values[1]) {
        //   picker.setSlotValue(1, values[0]);
        // }
      },
      changeDet(){
        let self = this;
        // console.log(this.$refs.picker.getValues()[0]);
        self.popupVisible = false;
        self.branch = this.$refs.picker.getValues()[0].name;
        self.branchId = this.$refs.picker.getValues()[0].value;
      },
      submit(){
        let self = this;
        if(self.userName == '' ){
          Toast({
            message: '用户名不能为空',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false;        
        } else if(self.branchId == '') {
          Toast({
            message: '部门不能为空',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false; 
          
        } else if(self.phonenum== ''){
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false; 
        }else if(self.IDnum== ''){
          Toast({
            message: '证件号不能为空',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false; 
        } else {
          this.axios.post('/api/wxInsertLxyUser',
            this.qs.stringify({
              userid:self.userid ,
              enrollArea: self.identity,
              enrollDept: self.branchId ,
              enrollName:self.userName,
              enrollGender: self.gender,
              enrollIdcard: self.IDnum,
              enrollPhone:self.phonenum,
              enrollRemark: self.remarks
            })
          ).then(res=>{
          console.log(res.data.status,"oooooooooooooooooooo");
          if(res.data.status == 200){
            // Toast('提示信息');
            Toast({
              message: '报名成功',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });
            setTimeout(() => {
              this.$router.push({'path':'order'});
            }, 1000);
            
          } else if(res.data.status == 300){
            // Toast('提示信息');
            Toast({
              message: ' 请勿重复提交！',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });
            setTimeout(() => {
              this.$router.push({'path':'order'});
            }, 1000);
            
          } else if(res.data.status == 400){
            // Toast('提示信息');
            Toast({
              message: ' 无此员工！',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });            
          } else if(res.data.status == 102){
            // Toast('提示信息');
            Toast({
              message: ' 省内报名名额已满!',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });            
          } else if(res.data.status == 101){
            // Toast('提示信息');
            Toast({
              message: ' 省外报名名额已满!',
              position: 'middle',
              duration: 800,
              className: 'toasts'
            });            
          }
        }).catch(ret =>{
          console.log(ret)
        })
      }             
    }
   }   
  }
</script>

<style lang="less">
  html{
    background:#fff;
  }
</style>

<style scoped lang="less">
  @sz:75rem;
  
  .bomBox{
    width:750/@sz;
  }
  .myInfo{
    margin-bottom: 0/@sz;
  }
  .endTime{
    width: 100%;
    height: 80/@sz;
    line-height: 80/@sz;
    text-align: left;
    font-size: 28/@sz;
    color: #FE5858;
    padding: 0 30/@sz;
    margin: 0 auto;
    border-top:1px solid #ECECEC;
    text-indent: 0;
  }
  .lxybox{
    width: 690/@sz;
    height: 690/@sz;
    margin: 0 auto;
    background: #fff;
    box-shadow:0px 1px 15px rgba(0,0,0,0.04);
    border-radius:10px;
    margin-bottom: 80/@sz;
  }
  .piceBox{
    width: 620/@sz;
    position: relative;
    text-align: left;
    height: 98/@sz;
    line-height: 98/@sz;
    font-size: 32/@sz;
    padding:10/@sz 0/@sz;
    border-bottom:1px solid rgba(238,238,238,1);
    margin: 0 auto;
    span{
      display: inline-block;
      width: 140/@sz;

    }
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
  .picker-toolbar-title{
    display: flex;
    flex-direction:row;
    justify-content:space-around;
    height: 80/@sz;
    line-height: 80/@sz;
    font-size: 32/@sz;
    padding-top: 8/@sz;
  }
  .usi-btn-cancel,.usi-btn-sure{
      color: #FF6600;
  }
</style>