<template>
  <div class="share">
   <div class="shareBox">
     <ul 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="moreLoading"
        infinite-scroll-distance="5"
        infinite-scroll-immediate-check="false"
      >
        <li v-for ="(item, index) in articles" :key ="index" @click="showCon(item.id,item.type)"> 
          <a v-if="item.type == 3"  target="_blank" :href="item.content" class="urlA"> </a>
         <div class="leftTest">

           <h1>{{item.title}}</h1>
            <p>{{item.time}} 
              <span v-if="item.type == 1">图文</span>
              <span v-else-if ="item.type == 2">投票</span>
              <span v-else-if ="item.type == 3">外链</span>
            </p> 
         </div>
          <div class="picbox">
             <img :src="item.url">
          
            
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
 
  export default {
    name:'share',
    data(){
      return {
        articles: [],
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        pageNum: 1,
        total:''
      };
    },
    components: {
     
    },
    created(){
       let self = this;
       this.axios.post('/api/queryShareP',this.qs.stringify({
        page:self.pageNum
       })).then(function(res){
          // console.log(res.data);
          self.articles = res.data.data.list;
          self.total = res.data.data.total;
          // console.log(self.articles,"[[[]]]]")
       }).catch(function(ret){
          console.log(ret)
       })
    },
    methods:{
      showCon(id,type){
        let self = this;
        // console.log(id,type,"内容");
        if(type == 1){
          this.$router.push({'path':'/newsPage',query:{
            id:id,
            state:'3',
            type:type
          }})
        } else if(type == 2){
          this.$router.push({'path':'/vote',query:{
            id:id,
            type:type
          }})
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
        this.axios.post("/api/queryShareP",this.qs.stringify({page:self.pageNum})).then((res) => {
          // console.log(res.data,"loadMore")
          if(res.data && res.data.data){
            self.articles = self.articles.concat(res.data.data.list);
            // console.log( self.articles.length,"=============",self.total)
            self.allLoaded = self.articles.length==self.total;
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
<style scoped lang="less">
body,html{
  background: rgba(252,252,252,1);
}
@sz:75rem;
.share{
  background:#fff;
}
  .shareBox{
    position: relative;
    width: 690/@sz;
    height: auto;
    margin:0 auto;
    ul{
      position:relative;
      width: 690/@sz;
      height: auto;
      li{
        position:relative;
        z-index: 1;
        width: 690/@sz;
        height: 250/@sz;
        border-bottom: 1px solid rgba(229,229,229,1);
        margin-bottom: 40/@sz;
        padding: 20/@sz 0;
        .urlA{
          position:absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          top:0;
          left:0;
          right: 0;
          bottom:0;
        }
        .leftTest{
          width: 380/@sz;
          height: 200/@sz;
          float: left;
          text-align: left;
          h1{
            width: 380/@sz;
            height: 150/@sz;
            line-height: 50/@sz;
            font-size: 34/@sz;
            color: #333;
            font-weight: normal;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:3; 
          }
          p{
            width: 380/@sz;
            line-height: 40/@sz;
            font-size: 28/@sz;
            color: #666;
            text-indent: 0;

            span{
              float: right;
            }
          }

        }
        .picbox{
          width: 280/@sz;
          height: 180/@sz;
          float: right;
          vertical-align: middle;
          line-height: 180/@sz;
          display: flex;
          text-align: center;
          border-radius:5px;
          padding-top:10/@sz;

          img{
            display: inline-block;
            align-items: center;
            border-radius:5px;
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