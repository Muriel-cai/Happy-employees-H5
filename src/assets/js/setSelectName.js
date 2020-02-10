// 根据接口返回的code 返回对应的文案
// 身份信息
let identityCodeText = (code) => {
  console.log(code);
  switch(code){
    case '101':
      return "居民身份证";
      break;
    case '102' :
      return "军官证";
      break;
    case '103' :
      return "士兵证";
      break;
    case '104' :
      return "文职干部证";
      break;
    case '105' :
      return "部队离退休证";
      break;
    case '106' :
      return "香港特区护照/身份证明";
      break;
    case '107' :
      return "澳门特区护照/身份证明";
      break;
    case '108' :
      return "台湾居民来往大陆通行证";
      break;
    case '109' :
      return "境外永久居住证";
      break;
    case '110' :
      return "其他";
      break;

  }
};
// 职务信息
let dutiesCodeText = (code) => {
  console.log(code);
  switch(code){
    case '201':
      return "总经理室";
      break;
    case '202' :
      return "非领导职务室";
      break;
    case '203' :
      return "专家室";
      break;
    case '204' :
      return "办公室";
      break;
    case '205' :
      return "人力资源部";
      break;
    case '206' :
      return "财务会计部";
      break;
    case '207' :
      return " 财务会计部-财务共享服务中心";
      break;
    case '208' :
      return " 车辆保险部/车商业务部";
      break;
    case '209' :
      return "车辆保险部/车商业务部-车险核保中心";
      break;
    case '210' :
      return " 财产保险部/船舶货运保险部";
      break;
    case '211':
      return " 理赔事业部";
      break;
    case '212' :
      return " 理赔事业部-理赔运营中心";
      break;
    case '213' :
      return " 理赔事业部-理赔稽查组";
      break;
    case '214' :
      return " 理赔事业部-未决赔案和理赔数据管理组 ";
      break;
    case '215' :
      return " 法律部/合规部";
      break;
    case '216' :
      return " 信息技术部";
      break;
    case '217' :
      return "监察部/审计部";
      break;
    case '218' :
      return " 重要客户部/军队保险部/经纪代理业务部";
      break;
    case '219' :
      return " 责任保险事业部/产业保险事业部/绿色保险事业部 ";
      break;
    case '220' :
      return "意外健康保险部";
      break;
    case '221':
      return "农村保险事业部/保险扶贫事业部";
      break;
    case '222' :
      return "再保险部/精算部";
      break;
    case '223' :
      return " 市场企划部";
      break;
    case '224' :
      return " 销售管理部 ";
      break;
    case '225' :
      return " 电子商务部";
      break;
    case '226' :
      return " 客户服务管理部 ";
      break;
    case '227' :
      return " 客户服务管理部-95518客户服务中心";
      break;
    case '228' :
      return "工会办公室";
      break;
    case '229' :
      return "教育培训部";
      break;
    case '230' :
      return " 社会医疗保险事业部";
      break;
    case '231':
      return "大数据中心";
      break;
    case '232' :
      return "惠普金融事业部/汽车金融事业部";
      break;
    case '233' :
      return " 其他部门";
      break;
    case '234' :
      return "人保汽车保险销售服务有限公司浙江省分公司（筹） ";
      break;
    case '235' :
      return " 浙江省党建协调委员会办公室";
      break;
    case '236' :
      return " 下派挂职人员部 ";
      break;
    case '237' :
      return " 互联网保险事业部";
      break;
    case '238' :
      return " 互联网保险事业部-总经理室";
      break;
    case '239' :
      return " 互联网保险事业部-浙江省公司互联网保险业务部商务发展部 ";
      break;
    case '240' :
      return " 互联网保险事业部-互联网保险业务部业务一部 ";
      break;
    case '241' :
      return "  国际保险事业部 ";
      break;
    case '242' :
      return "  国际保险事业部-总经理室";
      break;
    case '243' :
      return "  国际保险事业部-国际保险部 ";
      break;
  }
};

// 学历信息
let educationalCodeText = (code) => {
  console.log(code );
  switch(code){
    case '401':
      return "研究生教育";
      break;
    case '402' :
      return "大学本科教育";
      break;
    case '403' :
      return " 大学专科教育";
      break;
    case '404' :
      return " 中等职业教育";
      break;
    case '405' :
      return " 普通高级中学教育";
      break;
    case '406' :
      return " 初级中学教育";
      break;
    case '407' :
      return " 小学教育";
      break;
    case '408' :
      return " 其他";
      break;
  }
};

 let formatDate =(secs) =>{
    // var t = new Date(secs.replace(/\-/g,'/'));
    var t = new Date(secs);
    // var t = new Date(+new Date(tTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  ;
    // console.log(t,"----------")
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    var date = t.getDate()
    if (date < 10) { date = '0' + date }
    var hour = t.getHours()
    if (hour < 10) { hour = '0' + hour }
    var minute = t.getMinutes()
    if (minute < 10) { minute = '0' + minute }
    var second = t.getSeconds()
    if (second < 10) { second = '0' + second }
    // console.log(year + '-' + month + '-' + date)
    return year + '-' + month + '-' + date
};




export default{
  identityCodeText,
  dutiesCodeText,
  educationalCodeText,
  formatDate
}



