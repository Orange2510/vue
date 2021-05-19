<template>
  <div>
    <Header />
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 显示搜索条件 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a>全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 关键字 -->
            <li class="with-x"
                v-if="$route.params.keyword">{{$route.params.keyword}}<i class="iconfont icon-close-bold"
                 @click="delKeyword"></i></li>
            <!-- 品牌 -->
            <li class="with-x"
                v-if="options.trademark">{{options.trademark.split(':')[1]}}<i class="iconfont icon-close-bold"
                 @click="delTrademark"></i></li>
            <!--分类-->
            <li class="with-x"
                v-if="$route.query.categoryName">{{$route.query.categoryName}}<i class="iconfont icon-close-bold"
                 @click="delCategoryName"></i></li>
            <!-- 属性 -->
            <li class="with-x"
                v-for="props in options.props"
                :key="props">{{formatProps(props)}}<i class="iconfont icon-close-bold"
                 @click="delProps(props)"></i></li>
          </ul>
        </div>

        <!-- 商品品牌和商品属性 -->
        <SearchSelector :goSearch='goSearch'
                        :isSearchTrademark='options.trademark'
                        :isSearchProps='options.props' />

        <!-- 排序、商品列表、分页器 -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: order[0] === '1'}"
                    @click="setOrder('1')">
                  <a>综合
                    <i v-show="order[0]=== '1' "
                       :class="['iconfont', `icon-direction-${order[1] === 'asc' ? 'up' : 'down'}`]"></i>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li :class="{active: order[0] === '2'}"
                    @click="setOrder('2')">
                  <a>价格<i :class="['iconfont', `icon-direction-${order[1] === 'asc' ? 'up' : 'down'}`]"
                       v-show="order[0]=== '2' "></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                  v-for="good in goodsList"
                  :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a>
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html"
                       target="_blank"
                       class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);"
                       class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageSize="5"
                      :total='total' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import SearchSelector from './SearchSelector/SearchSelector'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      options: {
        // 品牌
        trademark: '',
        // 属性
        props: [],
        // 页数
        pageSize: 5,
        // 页码
        pageNo: 1,
        // 1: 综合,2: 价格 asc: 升序,desc: 降序
        order: "1:desc",
      },
    }
  },
  computed: {
    ...mapState({
      goodsList: state => state.search.goodsList,
      total: state => state.search.total,
    }),
    order () {
      return this.options.order.split(':')
    }
  },
  methods: {
    ...mapActions("search", ['searchGoodList']),
    // newOptions增加初始值
    // 搜索
    goSearch (newOptions = {}) {
      const { params, query } = this.$route
      // 更新搜索条件,利用对象后加的覆盖前面的
      const options = {
        ...this.options,
        ...newOptions,
      }
      // 判断有没有新增的属性
      if (newOptions.prop) {
        // 把新增的属性添加到options
        options.props.push(newOptions.prop)
        // 删除已添加数据
        delete options.prop
      }
      // 保存上次搜索
      this.options = options
      // 更新商品
      this.searchGoodList({
        // keyword
        ...params,
        // categoryName
        ...query,
        // props trademark order pageNo pageSize
        ...options,
      })
    },
    // 格式化数据
    formatProps (props) {
      const arr = props.split(':')
      return `${arr[2]}:${arr[1]}`
    },
    // 删除关键字
    delKeyword () {
      this.$router.history.push({
        name: "Search",
        // 保留原query参数
        query: this.$route.query,
      })
    },
    // 删除品牌
    delTrademark () {
      this.options.trademark = ''
      this.goSearch()
    },
    // 删除分类
    delCategoryName () {
      this.$router.history.push({
        name: "Search",
        params: this.$route.params
      })
    },
    // 删除属性
    delProps (prop) {
      // filter筛选不符合条件的属性
      this.options.props = this.options.props.filter(itme => itme !== prop)
      this.goSearch()
    },
    // 添加排序
    setOrder (newOrderName) {
      const [oldOrderName, oldOrderType] = this.order

      let orderType
      // 判断旧的OrderName === 新的OrderName
      if (oldOrderName === newOrderName) {
        // 如果相等即连续点击同一个
        orderType = oldOrderType === 'asc' ? 'desc' : 'asc'
      } else {
        // 否则点击不同的排序
        orderType = 'desc'
      }
      this.options.order = `${newOrderName}:${orderType}`
      this.goSearch()
    },
  },
  watch: {
    // 搜索功能的共同的是url地址
    // url地址变化就发送请求更新`数据实现搜索功能
    $route: {
      immediate: true,
      handler: function () {
        this.goSearch()
      }
    },
  },
  components: {
    SearchSelector,
    Header,
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>