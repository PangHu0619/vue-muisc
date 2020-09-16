export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }
  // 
  let newClass = el.className.split(' ')
  newClass.push(className)
  //join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
  el.className = newClass.join(' ')
}

// 判断是否有className
export function hasClass(el,className){
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
  // 含有className 首尾有空白符或者什么都bai没有的的字符串du
  // ^|\\s+ 表示什么都zhi没有（起始位置）或者dao 空白符
  // \\s+|$ 表示 空白符或者什么都没有（结束位置）
  // 例如："className" 或者 “ className ”
  return reg.test(el.className)
}