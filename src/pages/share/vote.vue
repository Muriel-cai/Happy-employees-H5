<template>
  <div class="box">
    <!-- <topTitle :title ="votecon.title"></topTitle> -->
    <div class="votebox">   
      <h1>{{votecon.title}}</h1>
       <h6>{{votecon.time}} 
        <!-- <span v-if="con.type == 1">图文</span>
        <span v-else-if ="con.type == 2">附件</span> -->
      </h6>
      <div class="conBox"  v-html="votecon.content">
        <!-- {{con.content}} -->
      </div>
      <!--倒计时-->

      <div class="timeBox">
        <div v-if='ifEnd == false'> 
          <span>{{day}}天</span> 
          <span>{{hour}}时</span>
          <span>{{minute}}分</span>
          <span>{{second}}秒后截止</span>
        </div>
        <div v-if='ifEnd == true'> 投票时间已截止 </div>
      </div>
      <div v-for="(item , index) in quesOption" class="choiceBox" >
        <div class="voteBox" v-if=" isVode == 'false' && ifEnd == false">
          <div v-if="item.type == 1">
            <mt-radio
              align="left"
              :title="`${index+1}、${item.title}  (单选)`"
              v-model= "item.value"
              :options="item.options"
              :value= "item.options"            
              >
            </mt-radio>
          </div>
          <div v-else-if="item.type == 2">
             <mt-checklist
               align="left"
               :title= "`${index+1}、${item.title}  (多选)`"
               v-model="item.value"
               :options="item.options">
             </mt-checklist>        
          </div>
         
        </div>
        <!--显示投票-->
        <!-- {{isVode}} -->
        <div class="showVoteInfo" v-if="isVode == 'true' || ifEnd == true">
          <h1 class="voteTitle" v-if="item.type == 1">{{index+1}}、{{item.title}} (单选)</h1>
          <h1 class="voteTitle" v-else-if="item.type == 2">{{index+1}}、{{item.title}} (多选)</h1>
          <ul>
            <li v-for="n in item.options" >
              <p class="voteLabel" >{{n.label}} </p>             
              <div class="leftInfo" v-if='item.values != null'>
                <el-progress :text-inside="true" :percentage="(setNum(n.ticket,item.ticketTotal))" v-if='item.values.includes(n.value) == true' :stroke-width="14"></el-progress>
                <el-progress :text-inside="true" :percentage="(setNum(n.ticket,item.ticketTotal))" v-else-if='item.values.includes(n.value) == false' :stroke-width="14" status="exception"></el-progress>
              </div>
              <div class="leftInfo" v-if="item.values == null">
                <el-progress :text-inside="true" :percentage="n.ticket"  :stroke-width  ="14" ></el-progress>            
                
              </div>
           <div class="rightInfo">{{n.ticket}} 票</div> 
              
            </li>
          </ul>
         
        </div>
      </div>
      <div class="sunBtn" @click="submit" v-if="isVode =='false' && ifEnd == false ">
        确认提交
      </div>  
    </div>    
  </div>
</template>
<script>
  import topTitle from '../../components/toptitle'
  export default {
    name:'votebox',
    data(){
      return {
        hrcode:'',
        id:'',
        votecon:[],
        quesOption:[] ,
        radioDuration:'',
        valueCon:[],
        endTime:'',
        nowTime:'',
        isVode:true,
        day:'',
        hour:'',
        minute:'',
        second:'',
        ifEnd:''

      };
    },
    components: {
      topTitle : topTitle
    },
    watch:{
      value(newval,oldval){
        // console.log(newval,oldval,this.quesOption[0].options)
        for(var i=0;i<this.quesOption[0].options;i++){
          if(newval == this.quesOption[0].value){
            // console.log(this.options[i].label,this.options[i].value)
            this.bindduration = this.quesOption[0].options.label;
          }
        }
      },
      isVode(val){
        // console.log(val,'isVode')
      },
      ifEnd(val){
        console.log(val,'ifEnd')
      }

    },
    created(){
       let self = this;
       self.hrcode = localStorage.getItem('code');
       
       this.getData();

    },
    methods:{
      setNum(n,m){
        // console.log(n,m,"kkkkkkkkkkkkkkk");
        let reg = /^(.*\..{2}).*$/;
        if(m>0){
          let num = String(n/m*100).replace(reg ,"$1");
          return Number(num);
        } else {
          return 0
        }           
      },
      getData(){
        let self = this;
        // console.log(this,"++++++++++++++++++++++++++++++", self.hrcode)
        
        // console.log(this.$route.query.id,"投票",self.quesOption.length);
        this.axios.post('/api/wxGetShare',
          this.qs.stringify({
            id:this.$route.query.id,
            type:2,
            hrCode : self.hrcode
          })
        ).then(res=>{
          // console.log(res.data,"self.quesOption",self.quesOption,res.data.id)  ;
          self.votecon = res.data;
          self.id = res.data.id;
          self.isVode = res.data.isVode;
          // console.log(res.data,"ppppp");
          self.endTime = new Date(res.data.endTime).getTime();
          // console.log(res.data.questionModels[],res.data.questionModels.length)
          for(let i = 0; i< res.data.questionModels.length; i++){
            console.log(res.data.questionModels[i].options)
            res.data.questionModels[i].options.forEach(function(n,m){
              n.value = String(n.value)
              // console.log(n.value)
            });
            // console.log(res.data.questionModels[i].type == 1,"11111")
            if(res.data.questionModels[i].type == 1){
              res.data.questionModels[i].value= '';
            } else if(res.data.questionModels[i].type == 2){
              res.data.questionModels[i].value = [];
            }            
          }
          self.quesOption = JSON.parse(JSON.stringify(res.data.questionModels)) ;
          // console.log(self.quesOption.options.length,"......................")
        }).then(res=>{
          this.countTime();
           // console.log(,'time') 
        }).catch(ret =>{
         
        });       
      },
      countTime(){
        let self = this;
        // console.log(self.endTime,"time");
        self.nowTime = new Date().getTime();
        //时间差
        var leftTime = self.endTime - self.nowTime;
        // console.log(leftTime,self.ifEnd);
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
            self.ifEnd = false;
            self.day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            self.hour = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            self.minute = Math.floor(leftTime / 1000 / 60 % 60);
            self.second = Math.floor(leftTime / 1000 % 60);
            if(self.day <10) {self.day = '0'+ self.day}
            if(self.hour <10) {self.hour = '0'+ self.hour}
            if(self.minute <10) {self.minute = '0'+ self.minute}
            if(self.second <10) {self.second = '0'+ self.second}

        } else {
           
           self.ifEnd = true;
          console.log('已结束')
        }
        // console.log(this.second);
        //递归每秒调用countTime方法，显示动态时间效果
        setTimeout(this.countTime, 1000);
      },
     
      submit(){
        let self = this;
        console.log(self.quesOption);
        self.quesOption.forEach(function(m,n){
          if(m.type == 1){
            self.valueCon.push(m.value)
          } else if(m.type == 2) {
            for (let i in m.value) {
              self.valueCon.push(m.value[i])
            }
          }         
        });
        // console.log(self.valueCon,"valueCon")
        let param = this.qs.stringify({
          hrCode: self.hrcode,
          id:self.id,
          value:self.valueCon.join(',')
        });
        this.axios.post('/api/voteShare',param).then(res=>{
          // console.log(res);
          this.getData();
        }).catch(ret=>{
          console.log(ret)
        })
      }

    }
   
  }
</script>
<style lang="less">
@sz:75rem;
   p{
    font-size: 28/@sz;
    line-height: 48/@sz;
    color: #707070;
    text-align: left;
    text-indent: 48/@sz;
    padding:12/@sz 0;
  }
  // .mint-radiolist{
  //   text-align: left;
  // }
  .mint-radiolist-title, .mint-checklist-title{
    font-size: 32/@sz;
    line-height: 60/@sz;
    color:#333333;
  }
</style>
<style scoped lang="less">
  @sz:75rem;
  .box{
    position:relative;
    width: 100%;
    height: auto;
    background: #fff;

  }
  .votebox{
    position: relative;
    width: 680/@sz;
    height:auto;
    margin: 0 auto;
    h1{
      font-size:36/@sz;
      color: #333;
      line-height: 50/@sz;
      padding: 40/@sz 0 20/@sz;
      text-align: left;
    }
    h6{
      font-size: 28/@sz;
      line-height: 50/@sz;
      color: #666;
      text-align: left;
      font-weight: normal;
    }
    .conBox{
      position:relative;
      width: 100%;
      height: auto;
     
    }
  }
 .choiceBox{
  text-align: left;
  clear: both;
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
  .timeBox{
    width: 690/@sz;
    height: 88/@sz;
    margin: 0 auto;
    background:#DDD;
    line-height:88/@sz;
    font-size: 30/@sz;
    span{
      display: inline-block;

    }
  }
  .voteTitle{
    font-weight: normal;
    font-size:32/@sz;
    color:#333;
  }
  .voteLabel{
    text-indent: 0;
    clear: both;
    font-size:28/@sz;
  }
  .leftInfo{
    width: 85%;
    float: left;
  }
  .rightInfo{
    display: block;
    width: 10%;
    float: right;
  }
</style>