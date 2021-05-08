import mockRequest from '../utils/mockRequest'
// 模拟数据
export default {
  reqGetBanners() {
    return mockRequest({
      url: '/getBanners',
      method: 'GET',
    })
  },
  reqGetData() {
    return mockRequest({
      url: '/getData',
      method: 'GET',
    })
  },
}
