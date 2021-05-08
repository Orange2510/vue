import Mock from 'mockjs'
import banners from './banners.json'
// mock会在Vue脚手架启动开发服务器中加入拦截请求功能
// 拦截请求后，返回模拟数据
Mock.mock('/mock/getBanners', 'get', {
  code: 200,
  message: '',
  ok: true,
  data: banners,
})

Mock.mock('/mock/getData', 'get', {
  code: 200,
  message: '',
  ok: true,
  'data|1-10': [
    {
      'id|+1': 1,
      name: '@cname()',
      'age|18-25': 18,
    },
  ],
})
