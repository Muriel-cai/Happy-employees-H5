<template>
  <div class="newsCon">
    <!-- <topTitle :title ="con.title"></topTitle> -->
    <div >
      <h1>{{con.title}}</h1>
       <h6>{{con.time}} 
        <span v-if="con.type == 1 ">图文</span>
        <span v-else-if ="con.type == 2">PDF</span>
        <span v-else-if ="con.type == 4">附件</span>
      </h6>
       <div class="conBox" v-if="con.type == 1"  v-html="con.content">
         {{con.content}}
       </div>
       <div v-if='con.type == 2' ref="pdfList" class="pdfList">
        <!-- <pdf  :src="src"></pdf> -->
        <pdf
          v-for="i in numPages"
          :key="i"
          :src="src"
          :page="i"
          style="display: inline-block; width: 100%"
        ></pdf>
     </div>
    <!--  <div v-if='con.type == 4' >
         <pdf :src="con.content"></pdf>
     </div> -->
     </div>

     
  </div>
</template>
<script>
  import topTitle from '../../components/toptitle'
  import pdf from 'vue-pdf'
 
  export default {
    name:'newsCon',
    data(){
      return {
       con:[],   
       src:'',
       numPages: undefined,
       state:'',
       hrcode:''
      };
    },
    mounted() {
      // this.pdfTask(this.src)
    // this.src.then(pdf => {
    //   console.log(pdf,"odf");
    //   this.numPages = pdf.numPages;
    // });
  },
    components: {
      topTitle : topTitle,
      pdf:pdf
    },
    created(){
      let self = this;
      self.hrcode = localStorage.getItem('code');
      console.log(this.$route.query);
      self.state = this.$route.query.state;
      if(self.state==1){
        this.axios.post('/api/wxGetAnnouncement',
          this.qs.stringify({
            id:this.$route.query.id
          })
          ).then(res=>{
          // console.log(res.data,"公告");
          self.con = res.data;
          
          // console.log(self.con)
  
        }).catch(ret =>{
          console.log(ret)
        })
      } else if(self.state == 3){
        this.axios.post('/api/wxGetShare',
          this.qs.stringify({
            id:this.$route.query.id,
            type:this.$route.query.type,
            hrCode :self.hrcode
          })
          ).then(res=>{
          console.log(res,"分享");
          self.con = res.data;
          
          // console.log(self.con)
  
        }).catch(ret =>{
          console.log(ret)
        })
      } else if(self.state == 2 || self.state == 4){
        this.axios.post('/api/wxGetAnnouncement',
          this.qs.stringify({
            id:this.$route.query.id
          })
          ).then(res=>{
            
               console.log(res.data,"附件");
               // this.showPdf(res.data.content)
               self.con = res.data;
               this.pdfTask(res.data.content)
            
         
          // loadingTask = pdf.createLoadingTask("http://10.9.1.179:8071/api/file/5a307665-b596-43ee-86e8-ca3c4f064aa5.pdf");
          // console.log(self.con)
  
        }).catch(ret =>{
          console.log(ret)
        })
      };

      
    },
    methods:{
      pdfTask(pdfUrl){
        var self = this
        var loadingTask = pdf.createLoadingTask(pdfUrl)  ;
        console.log(loadingTask,"loadingTask")
        loadingTask.then(pdf => {
          console.log(pdf,"pdf")
          self.src = loadingTask
          self.numPages = pdf.numPages
        }).catch((err) => {
          console.error('pdf加载失败')
      })
      },
    }
   
  }
</script>
<style lang="less">
@sz:75rem;
   p{
    font-size: 28/@sz;
    line-height: 48/@sz;
    color: #666;
    text-align: left;
    text-indent: 48/@sz;
    padding:12/@sz 0;
  }
</style>
<style scoped lang="less">
  @sz:75rem;
  .newsCon{
    position: relative;
    width:100%;
    height:auto;
    margin: 0 auto;
    h1{
      width: 100%;
      font-size:36/@sz;
      color: #333;
      line-height: 50/@sz;
      padding: 40/@sz 30/@sz 20/@sz;
      text-align: left;
    }
    h6{
      width: 100%;
      font-size: 28/@sz;
      line-height: 50/@sz;
      color: #666;
      text-align: left;
      font-weight: normal;
      padding:  0/@sz 30/@sz;
    }
    .conBox{
      position:relative;
      width: 100%;
      height: auto;
      padding:  10/@sz 30/@sz 50/@sz;
    }
    .pdfList{
      position:relative;
      width: 100%;

    }
  }

 
</style>