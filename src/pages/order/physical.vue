<template>
  <div class="lxybm">
    <!-- <topTitle :title="title"></topTitle> -->
    <p class="secTitle">请选择医院</p>
    <div class="physicalbox hospbox"> 
      <ul class="hosUl">
        <li v-for="item in hospitalData" :class="{hashos : item.id == hosId}"  @click="choiceHospital(item.id)">
          <span v-show="item.id == hosId"></span>
          {{item.hospitalName}}
        </li>
      </ul>
    </div>
    <p class="secTitle">其它信息</p>
    <div class="physicalbox">   
      <div class="piceBox">
        <span class="leftText">姓名</span>
        <el-input v-model="name" ></el-input>
      </div>
      <div class="piceBox ">
        <span class="leftText">性别</span>
        <el-radio-group v-model="gender" >
          <el-radio label="1" size="medium">男</el-radio>
          <el-radio label="2" size="medium ">女</el-radio>
        </el-radio-group>
      </div>
      
      <div class="piceBox ">
        <span class="leftText">年龄</span>
        <el-input v-model="age" placeholder="请输入"></el-input>
       
      </div>
      <div class="piceBox no-border">
        <span class="leftText">婚姻状态</span>
        <el-input v-model="MaritalState" placeholder="请输入" @focus="showBom"></el-input>
      </div>
    </div>
    <div class="sunBtn" @click="submit">
      确认提交
    </div>
    <!--选择婚姻状态的底部弹出框-->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      closeOnClickModal="true"
      >
      <mt-picker :slots="dateSlots" class="bomBox" ref="picker" showToolbar valueKey="name">
         <div class="picker-toolbar-title">
             <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
             <div class="">请选择婚姻状态</div>
             <div class="usi-btn-sure" @click="changeMarital">确定</div>
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
       title:"体检报名",
       hrcode:'',
       userId:'',
       name:"",
       gender:'',
       age:"",
       hosId:'',
       contractType:'',
       MaritalId:'',
       MaritalState:'',
       hospitalData:[      
       ],
       popupVisible:false,
       dateSlots:[
        {values:[

        ]}
       ],
       currentTags:{}
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
        // console.log(res.data.data,"员工信息");
        self.contractType = res.data.data.contract_type;
        self.name = res.data.data.user_name;
        self.maritalId = res.data.data.marital_status;
        self.gender = res.data.data.gender;
        self.userId = res.data.data.user_id;

      }).then(res=>{
         this.axios.post('/api/wxQueryHospitalByContract',this.qs.stringify({
          contract_type:self.contractType
        })
        ).then(res=>{
          // console.log(res.data,"医院")   
          self.hospitalData = res.data.data;
        }).catch(ret =>{
          console.log(ret)
        })
      }).catch(ret=>{
        console.log(ret)
      })      
    },
    component:{
      dataList () {
        let dateSlots = [
          {
            flex: 1,
            values: this.tagList,
            className: 'slot1',
            textAlign: 'center'
          }
        ];
        return  dateSlots
      }
    },
    methods:{
      choiceHospital:function(option){
        let self = this;
        // console.log(option)
        self.hosId = option;
      },
      showBom(){
        let self = this;
        self.popupVisible = true;
        document.activeElement.blur();
        this.axios.post('/api/wxGetCategoryById',
          this.qs.stringify({
            cateParentId:'900'
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
      // onValuesChange(picker, values) {
      //   let self = this;
      //   self.MaritalState = picker.getValues()[0].name;
      //   self.MaritalId = picker.getValues()[0].value;       
      //   if (values[0] > values[1]) {
      //     picker.setSlotValue(1, values[0]);
      //   }
      // },
      changeMarital(){
        let self = this;
        // console.log(this.$refs.picker.getValues()[0]);
        self.popupVisible = false;
        self.MaritalState= this.$refs.picker.getValues()[0].name;
        self.MaritalId = this.$refs.picker.getValues()[0].value;
      },
      submit(){
        let self = this;
        if(self.hosId == '' ){
          Toast({
            message: '请选择医院',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false;        
        } else if(self.age == '') {
          Toast({
            message: '年龄不能为空',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false; 
          
        } else if(self.MaritalId== ''){
          Toast({
            message: '请选择婚姻状态',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false; 
        }else if(self.name== ''){
          Toast({
            message: '姓名不能为空',
            position: 'middle',
            duration: 800,
            className: 'toasts'
          });
          return false; 
        } else {
          this.axios.post('/api/wxAddTijianUser',this.qs.stringify({
            userid:self.userId,
            hospitalid : self.hosId,
            tjGender: self.gender,
            tjAge: self.age,
            maritalId:self.MaritalId,
            tjName :self.name
          })
          ).then(res=>{
            // console.log(res,"baoming ");
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
          }
          }).catch(ret =>{
            console.log(ret)
          })
        }
        // console.log(self.contractType, self.gender,self.age,self.maritalId,self.name)
        
      }
    }
   
  }
</script>

<style scoped lang="less">
  @sz:75rem;
  .bomBox{
    width:750/@sz;
  }
  .secTitle{
    width: 100%;
    height:74/@sz;
    line-height: 74/@sz;
    text-align: left;
    font-size: 28/@sz;
    color: #999;
    padding: 0 30/@sz;
    margin: 0 auto;
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
  .hospbox{
    margin-bottom: 0/@sz;
  }
  .hosUl{
    position:relative;
    width: 100%;
    height: auto;
    li{
      position:relative;
      width: 100%;
      height: 176/@sz;
      padding-left:50/@sz;
      line-height: 176/@sz;
      text-align: left;
      color: #333;
      font-size: 42/@sz;
      box-shadow:0px 1px 5px rgba(0,0,0,0.06);
      border-radius:20px;
      background: url(../../assets/img/icon_hospital.png) no-repeat right 50/@sz center;
      background-size:100/@sz 100/@sz;
      margin-bottom: 30/@sz;
      span{
        position:absolute;
        // display: none;
        z-index:10;
        width: 60/@sz;
        height: 60/@sz;
        top:0;right: 0;
        background:#fff url(../../assets/img/icon_choose.png) no-repeat top center;
        background-size:60/@sz 60/@sz;
      }
    }
    .hashos{
      font-size: 46/@sz;
      font-weight: bold;
    }
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
    .leftText{
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
  .optionBox{
    position:fixed;
    z-index: 2010;
    bottom:0;
    left:0;
    right: 0;
    height: 345/@sz;
    width: 100%;
    background:#fff;
    padding:20/@sz 0;
    p{
      height: 60/@sz;
      line-height: 60/@sz;
      font-size: 30/@sz;
      color: #333;
      text-align: center;
      border-bottom:1px solid rgba(238,238,238,1);
      &:last-child{
        border-bottom:none;
      }
    }
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
