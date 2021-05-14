import request from '../utils/request'
export default {
  // 搜索商品
  reqSearchGoodList(data) {
    return request({
      method: 'POST',
      url: '/list',
      data,
    })
  },
}
