import request from '../utils/request'
export default {
  // ๆ็ดขๅๅ
  reqSearchGoodList(data) {
    return request({
      method: 'POST',
      url: '/list',
      data,
    })
  },
}
