// import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'

// export function getRecommend(){
//   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   // Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
//   const data = Object.assign({},commonParams,{
//     platform:'h5',
//     uin:0,
//     needNewCode:1
//   })

//   return jsonp(url,data,options)
// }
import jsonp from 'common/js/jsonp'
import {axios} from 'common/js/axios'
import {commonParams, options, qyqx} from './config'
// import axios from 'axios'

export async function getRecommend() {
  // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  // const data = Object.assign({}, commonParams, {
  //   platform: 'h5',
  //   uin: 0,
  //   needNewCode: 1
  // })

  // return jsonp(url, data, options)
  let lbt = {}
  await axios({url:`${qyqx}/lbt`}).then(res => {
    lbt = res.data
  })
  
  return lbt
}

export async function getDisList(){
  const data = ''
  let hotUrl = ''
  await axios({url:`${qyqx}/recommend`}).then(res => {
    hotUrl = res.data.url[0]
  })

  return jsonp(hotUrl, data)
}