import _axios from 'axios'

export function axios(config){
  const newAxios = _axios.create({
    timeout:1200000
  })
  return newAxios(config)
}