<template>
  <div class="apply">
    <p class="noticeT">仅限非紧急情况，若感身体不适，就近就医</p>
    <div class="physicalbox">   
     
      <div class="piceBox">
        <span class="leftText">问诊人姓名</span>
        <el-input v-model="jzname" placeholder="请输入"></el-input>
      </div>
      <div class="piceBox ">
        <span class="leftText">性别</span>
        <el-radio-group v-model="gender" >
          <el-radio label="1" size="medium">男</el-radio>
          <el-radio label="2" size="medium ">女</el-radio>
        </el-radio-group>
      </div>
      <div class="piceBox ">
        <span class="leftText" >是否本人</span>
        <el-radio-group v-model="isYouself" >
          <el-radio label="1" size="medium">是</el-radio>
          <el-radio label="2" size="medium ">否</el-radio>
        </el-radio-group>
       
      </div>
      <div class="piceBox ">
        <span class="leftText">联系电话</span>
        <el-input v-model="phonenum" placeholder="请输入"></el-input>
       
      </div>     
      <div class="piceBox " >
        <span class="leftText" >问诊日期</span>
        <span class="showData" @click="selectData ">{{placeholderT}} {{checkData}} </span>
       <!--  <el-date-picker
          v-model="goDoctorData"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd" 
          value-format="yyyy-MM-dd"
          @change="getTime"
          >
        </el-date-picker> -->
        <span v-if="visible">
       <mt-datetime-picker
          lockScroll="true"
          ref="datePicker"
          v-model="goDoctorData"
          class="myPicker"
          type="date"
          :startDate="startDate"
          year-format="{value}年"
          month-format="{value}月"
          date-format="{value}日"
          @confirm="dateConfirm"
          @cancel="visible = false;$emit('datePicker')"
        >
        </mt-datetime-picker>
      </span>
      </div>
      <div class="piceBox " v-show="hasNum">
        <span class="leftText">剩余号位</span>
        <el-input v-model="synum" placeholder=""></el-input>
       
      </div>
      <div class="piceBox ">
        <span class="leftText" style="width: ">是否已就医</span>
        <el-radio-group v-model="isgoDoctor" >
          <el-radio label="1" size="medium">是</el-radio>
          <el-radio label="2" size="medium ">否</el-radio>
        </el-radio-group>
      </div>
      <div class="piceBox ">
        <span class="leftText">症状描述</span>
         <el-input v-model="remark" placeholder="请输入"></el-input>
       
      </div>
    </div>
    <div :class="['sunBtn', {nocount : hascount == false } ]" @click='sunEvent'>
      确认提交
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  export default {
    name:'apply',
    data(){
      return {
        hrcode:'',
        userId:'',
        jzname:'',
        phonenum:'',
        isYouself:'1',
        hasNum:true,
        gender:'1',
        isgoDoctor:'2',
        goDoctorData:'',
        synum:'',
        remark:'',
        hascount:true,
        checkData:'',
        placeholderT:'请选择时间',
        visible:false,
        startDate:new Date()
      };
    },
    components: {
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');
      this.axios.post('/api/wxQueryUserByphone',this.qs.stringify({
        hrCode:self.hrcode
      })
      ).then(res=>{
        console.log(res,"pppppppppp+++++++++")
        self.jzname = res.data.data.user_name;
        self.gender = res.data.data.gender;
        self.phonenum = res.data.data.phone;
        self.userId  = res.data.data.user_id;
      }).then(res=>{
        this.axios.post('/api/getTpdoctorNumByUserId',
          this.qs.stringify({
            hrCode:self.hrcode
          })
        ).then(function(res){
          console.log(res.data.status,'获取就医数目')
         if(res.data.status == 200) {
           self.hascount = true;
         } else if(res.data.status == 300) {
           self.hascount = false;
         }
          // self.endTime = res.data.data.CultureEndTime;
        }).catch(function(ret){
          console.log(ret)
        })
      })
    },
    methods:{
      selectData () { 
        let self = this;
        // this.$refs['datePicker'].open();
      self.visible = true;
      if (self.checkData) {
             self.goDoctorData = self.checkData
         } else {
             self.goDoctorData = new Date()
        }  
        setTimeout(function () {
          self.$refs['datePicker'].open();
        },100)    
        
      },
      // checkinCancel(){
      //   console.log(this.$refs['datePicker'],this.$refs['datePicker'])
      //   this.$refs['datePicker'].close();
      // },
      dateConfirm(){
        let self = this;
        self.goDoctorData = this.setSelectName.formatDate(self.goDoctorData); 
        self.checkData = this.setSelectName.formatDate(self.goDoctorData); 
        self.placeholderT ='';
        this.axios.post('/api/wxGetCountEveryDay',this.qs.stringify({
          wzTime:self.goDoctorData
        })).then(res=>{
          console.log(res.data.data,"++++++++++++++");
          if(res.data.data > 0){
            self.synum = res.data.data;
            self.visible = true;
            this.$refs['datePicker'].close()
          } else if(res.data.data == 0) {
            Toast({
              message: '该时段暂无名额！',
              position: 'middle',
              duration: 1000,
              className: 'toasts'
            });  
          }
         
        }).catch(ret =>{
          console.log(ret)
        });
        console.log(self.goDoctorData,"goDoctorData");
      },
      sunEvent(){
        let self = this;
         // window.location.href = 'tel://18757555056'
        if( self.hascount == false){
          Toast({
            message: '您已无报名次数！',
            position: 'middle',
            duration: 1000,
            className: 'toasts'
          });     
        } else if(self.synum == ''){
          Toast({
            message: '请选择会诊日期！',
            position: 'middle',
            duration: 1000,
            className: 'toasts'
          });

        } else {
          let param = this.qs.stringify({
            wzName:self.jzname,
            wzGender:self.gender,
            wzPhone:self.phonenum,
            wzRelation:self.isYouself,
            wzTime:self.goDoctorData,
            isSeek:self.isgoDoctor,
            wzDescription:self.remark,
            hrCode : self.hrcode
          })
          this.axios.post('/api/wxInsertWzUser',param).then(res=>{
            console.log(res.data.status);
            if(res.data.status == 200){
              // Toast({
              //   message: '报名成功！',
              //   position: 'middle',
              //   duration: 1000,
              //   className: 'toasts'
              // }); 
              MessageBox.alert('报名成功!电话医生将尽快联系您！').then(action => {
                
                this.$router.push('record');
              }); 
            } else if(res.data.status == 400) {
              Toast({
                message: '该时段暂无名额！',
                position: 'middle',
                duration: 1000,
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
@sz:75rem;
html{
    background: #fff;
}
.el-input, .el-input .el-input__inner {
    width: 420/@sz!important;
}
  
</style>
<style scoped lang="less">
  @sz:75rem;
  .noticeT{
    width: 100%;
    height: 80/@sz;
    line-height: 80/@sz;
    color: #F2AD34;
    font-size:28/@sz;

  }
  .physicalbox{
    position:relative;
    width: 690/@sz;
    height: auto;
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
      width: 170/@sz;

    }
    .showData{
       display: inline-block;
      width: 380/@sz;
      font-size: 28/@sz;
      padding-left:28/@sz;
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
  .nocount{
    background:#999;
    box-shadow:0px 4px 15px rgba(0,0,0,0.04);
  }
</style>