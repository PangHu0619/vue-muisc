// 封装jsonp
import originJSON from 'jsonp'

export default function jsonp(url,data,option){
  url += (url.indexOf('?') <0? '?':'&') + param(data)

  return new Promise((resolve,reject) => {
    originJSON(url,option,(err,data) => {
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

function param(data){
  let url = ''
  for (var k in data){
    let value = data[k] !== undefined ? data[k] : ''

    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

/*
在一些情况下，需要直接往url上拼接请求参数。

http://www.yanggb.com?flag=1&type=normal&role=customer
通过上面的例子就可以看出，第一个参数需要以【?】开头，然后是参数名，然后是【=】，然后是参数值。

第二个参数开始则需要以【&】开头，然后是参数名，然后是【=】，然后是参数值。

这就是url拼接参数的格式要求。

另一种理解就是，当需要往url上拼接请求参数的时候，需要以【?】作为分隔符，在【?】分隔符的右边开始拼接参数对，参数对的格式是【参数名=参数值】，不同参数对之间以【&】作为分隔符。
*/
