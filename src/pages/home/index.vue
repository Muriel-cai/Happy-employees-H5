<template>
  <div class="home">
   <div class="combox">
   <!--  <div class="iframe">
       <img v-if="imgSrc" :src="imgSrc">
    </div> -->
     <!-- <iframe ref="iframebox" :src="'/static/pdf/web/viewer.html?file=http://10.9.1.179:8071/api/file/0ebbebad-7723-4d54-8d29-c295311dc516$xxx通知.pdf' " src="" width='100%' height='100%' frameborder='1'>
      </iframe> -->
     <ul v-infinite-scroll="loadMore"
         infinite-scroll-disabled="moreLoading"
         infinite-scroll-distance="5"
         infinite-scroll-immediate-check="false"
         >
        <li v-for="(item ,index) in news" :key= "index"  @click="showCon(item)"> 
          <!-- <a v-if="item.type == 4"  target="_blank" :href="item.content" class="urlA"> </a> -->
         <!-- <div class="picbox" v-if="item.url"> -->
           
          <div class="picbox" v-if="item.url">
            <img :src="item.url">                      
          </div>
         <div class="textinfo" >
           <h1>{{item.title}}</h1>
           <p>{{item.time}} <span>点击查看 ></span></p>
         </div>
        </li>
       <!--底部判断是加载图标还是提示“全部加载”-->
        <li class="more_loading" v-show="!queryLoading">
          <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner      >
          <span v-show="allLoaded">已全部加载</span>
        </li>
     </ul>
   </div>
  </div>
</template>
<script>
 let Base64 = require('js-base64').Base64;
  export default {
   name:'home',
    data(){
      return {
        news: [],
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        pageNum: 1,
        total:'',
        imgSrc:''
      };
    },
    components: {
     
    },
    mounted () {
      // document.title = this.title
      // this.imgSrc = Base64.decode('https://mp.weixin.qq.com/s/5g7xDl-MHP-KRakiG1rMIg')
    },
    created(){
      let self = this;     
      this.axios.post('/api/queryAnnouncementP').then(function(res){
          console.log(res.data,"piiis",self.news);
          self.news = res.data.data.list;
          self.total = res.data.data.total;
          if(res.data.data.total <5){
            console.log(self.total ,self.queryLoading)
            self.queryLoading = true;
           // console.log(self.news,"psdk");
           let asd = 'zhes luandade m';
          }
      }).catch(function(ret){
        console.log(ret);
      })
    },
     computed: {
      // params() {
      //   return{
      //     //这里先定义要传递给后台的数据
      //     //然后将每次请求20条的参数一起提交给后台
      //     page: this.pageSize
      //     }
      // }
    },
    methods:{
      showCon(option){
        let self = this;
        console.log(option.type,"内容",option);
        if(option.type == 1 || option.type == 2 ){
          console.log(1111);
          this.$router.push({'path':'/newsPage',query:{
            id:option.id,
            type: option.type,
            state: option.type
          }})
        } else if(option.type == 3 || option.type == 4) {
          console.log(3);
          window.location.href = option.content;
          // window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(url))
          window.location.href = option.content;
        }
        
        // this.$router.push({'path':'/partCheck',query:{postId:option, modelId:modelId,name:name}})
      },
       //无限加载函数
      loadMore() {
        let self = this;
        if(self.allLoaded){
          self.moreLoading = true;
          return;
        }
        if(self.queryLoading){
          return;
        }
        self.moreLoading = !self.queryLoading;
        self.pageNum++;
        this.axios.post("/api/queryAnnouncementP",this.qs.stringify({page:self.pageNum})).then((res) => {
          console.log(res.data,"loadMore")
          if(res.data && res.data.data ){
            self.news = self.news.concat(res.data.data.list);
            // self.allLoaded = true;
            // console.log( self.news.length,"=============",self.total)
            self.allLoaded = self.news.length == self.total;
          } 
          self.moreLoading = self.allLoaded;
        }).catch(ret=>{
          console.log(ret)
        });
      }


    }

    // async beforeCreate(){
    //   this.data = (await (await fetch("/api/house/get")).json()).data;
    //   this.$parent.footer = MyFooter;
    // }
  }
</script>
<style lang ="less">
html{
  background:#fff;
}
</style>

<style scoped lang ="less">
html{
  background:#fff;
}
.home{
  background:#fff;
  padding: 20/@sz auto 120/@sz;
}
.iframe {
    width: 650/@sz;
    height: 300/@sz;
    padding: 0;
}
@sz:75rem;
  .combox{
    width: 690/@sz;
    height: auto;
    position: relative;
    overflow: hidden;
    margin:0 auto;
    ul{
      width: 100%;
      height: auto;
      position: relative;
      overflow: hidden;
      padding-top:20/@sz;
      li{
        position: relative;
        width: 690/@sz;
        height:auto;
        box-shadow:0px 1px 15px rgba(0,0,0,0.15);
        border-radius:15px;
        margin-bottom: 40/@sz;
        background: #fff; 
        .urlA{
          position: absolute;
          z-index: 10;
          width: 100%;
          height: 100%;
          left:0;right: 0;
          top:0;bottom:0;

        }
         .picbox{
          width: 690/@sz;
          height: 340/@sz;
          vertical-align: middle;

          img{
            display:block;
            align-items: center;
            border-radius:5px;
            width: 690/@sz;
            height: 340/@sz;
          }
          
        }
        .textinfo{
          width: 690/@sz;
          padding: 10/@sz 20/@sz;
          h1{
            height: auto;
            width: 100%;
            line-height: 65/@sz;
            border-bottom:1px solid rgba(226,226,226,1);
            text-align: left;
            color: #333;
            font-size: 32/@sz;
            font-weight: normal;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; 
          }
          p{
            height: 65/@sz;
            width: 100%;
            line-height: 65/@sz;
            text-align: left;
            color: #666;
            font-size: 24/@sz;
            text-indent: 0;
            span{
              float: right;
            }
          }
        }

      }
      .more_loading{
        height: 60/@sz;
        line-height: 60/@sz;
        border:none;
      }
    }
  }

</style>