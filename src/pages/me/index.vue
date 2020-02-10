<template>
  <div class="me">
   <div class="myInfo">
     <div class="mypic">
       <img :src="userPic">
     </div>
     <p>{{userName}}({{hrcode}})</p>
   </div>
   <hasSelect @getSelect="changeSelect(1)"  :coverImage ="bmPic" :leftT = "branch" :rightT = "section"></hasSelect>
   <hasSelect @getSelect="changeSelect(2)"  :coverImage ="xueliBg" :leftT = "educational" :rightT = "section"></hasSelect>
   <listC :url="tobranch"  :coverImage ="myewm" :leftT = "zsm" :rightT = "checkText"></listC>
   <router-view />
   <mt-popup
      v-model="popupVisible"
      position="bottom"
      closeOnClickModal="true"
      >
      <!-- <mt-actionsheet
        :actions="maritalOption"
        v-model="popupVisible">


      </mt-actionsheet> -->
     <mt-picker :slots="dateSlots"   class="bomBox" showToolbar ref="picker" valueKey="name">
         <div class="picker-toolbar-title">
             <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
             <div class="">{{selectText}}</div>
             <div class="usi-btn-sure" @click="submit">确定</div>
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
  import listC from './components/list'
  import hasSelect from './components/hasSelect'
  export default {
    name:'me',
    data(){
      return {
        phone:'',
        userPic:require("../../assets/img/img_userpic.png"),
        userName:'',
        hrcode:"",
        bmPic:require("../../assets/img/icon_bumen.png"),
        branch:"部门-",
        branchId:'',
        section:'修改',
        tobranch:'/me/zsm',
        myewm:require('../../assets/img/icon_qrc.png'),
        zsm:"专属码",
        xueliBg:require('../../assets/img/icon_xueli.png'),
        educational:"学历-",
        educationalId:'',
        checkText:"查看",
        selectText:"",
        popupVisible:false,
        dateSlots:[
        {values:[

        ]}
       ],
        changeType:''
      };
    },
    components: {
     listC :listC,
     hasSelect:hasSelect
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');
      this.axios.post('/api/wxQueryUserByphone',this.qs.stringify({
        hrCode:self.hrcode
      })).then(res=>{
        // console.log(res.data);
        self.userName = res.data.data.user_name;
        self.branch = "部门-"+ this.setSelectName.dutiesCodeText(res.data.data.user_dept) ;
        self.educational = "学历-"+ this.setSelectName.educationalCodeText(res.data.data.education) ;
        self.branchId = res.data.data.user_dept;
        self.educationalId = res.data.data.education;
      }).catch(ret =>{
        console.log(ret)
      })
    },
    methods:{
      changeSelect(type){
        let self = this;
        if(type == 1){
          self.changeType = "200";
          self.selectText="请选择部门";
        } else if(type == 2){
          self.changeType = "400";
          self.selectText="请选择学历"
        }
        self.popupVisible = true;
        // console.log(self.changeType)
        this.axios.post('/api/wxGetCategoryById',
          this.qs.stringify({
            cateParentId:self.changeType
          })
        ).then(res=>{
          // console.log(res.data.data);
          self.dateSlots[0].values=[];
          res.data.data.forEach(function(value,index,arr){
            let arrs = {
              name:value.cateName,
              value:value.cateId
            };
            // console.log(arrs)
            self.dateSlots[0].values.push(arrs)
          })
        }).catch(ret=>{
            console.log(ret)
        })      
      },
      onValuesChange(picker, values) {
        let self = this;
        // console.log(values,self.changeType);
        
      },

      submit(){
        let self = this;
        self.popupVisible = false;
        // console.log(this.$refs.picker.getValues()[0]);
        if(self.changeType == '200'){
          self.branch = "部门-"+this.$refs.picker.getValues()[0].name;
          self.branchId = this.$refs.picker.getValues()[0].value;
        } else if(self.changeType == '400'){
          self.educational = "学历-"+ this.$refs.picker.getValues()[0].name;
          self.educationalId = this.$refs.picker.getValues()[0].value;
        };
        console.log()
        this.axios.post('/api/wxUpdateUserByPhone',this.qs.stringify({
          hrCode: self.hrcode,
          userDept: self.branchId,
          Education: self.educationalId
        })).then(res=>{
          // console.log(res,"tijiap+++++++++")
        }).catch(ret=>{
          console.log(ret)
        })
      },
      getcodeName(code){
        let self = this;
        // switch(code) {
        //   case :
        //      代码块
        //      break;
        //   case n:
        //      代码块
        //      break;
        //   default:
        //      默认代码块
        // } 
      }
    }
  }
</script>
<style lang="less">
@sz:75rem;
 .el-input {
   width: 460/@sz!important;;
   height: 60/@sz;
   padding:0;
   font-size: 28/@sz;
}
.el-input .el-input__inner {
    height: 60/@sz;
    height: 60/@sz;
    border:none;
    
}
</style>
<style scoped lang="less">
@sz:75rem;
 .bomBox{
    width:750/@sz;
    padding-bottom:0.5rem;
    height: auto;
  }
  .me{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 30/@sz;
  }
  .myInfo{
    position: relative;
    width: 690/@sz;
    height: 360/@sz;
    margin:0 auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 15px rgba(0,0,0,0.06);
    border-radius:15px;
    padding:20/@sz 40/@sz;
    margin-bottom: 40/@sz;
    .mypic{
      width: 230/@sz;
      height: 230/@sz;
      margin:0 auto;  
    }
    p{
      width: 100%;
      height: 60/@sz;
      line-height: 60/@sz;
      text-align: center;
      font-size: 32/@sz;
      color: #333;
    }
  }
  .optionBox{
    position:fixed;
    z-index: 2001;
    bottom:0;
    left:0;
    right: 0;
    height: auto;
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
  .mint-popup-bottom{
    bottom:100/@sz;
  }
</style>