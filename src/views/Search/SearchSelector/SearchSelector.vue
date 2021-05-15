<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list"
            @click='searchTrademark'>
          <!-- 遍历品牌 -->
          <li v-for="trademark in trademarkList"
              :key="trademark.tmId"
              :data-trademark="`${trademark.tmId}:${trademark.tmName}`">{{trademark.tmName}} </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);"
           class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 遍历品牌属性 -->
    <div class="type-wrap"
         v-for="attrs in attrsList"
         :key="attrs.attrId">
      <div class="fl key">{{attrs.attrName}}</div>
      <div class="fl value">
        <ul class="type-list"
            @click="searchProps">
          <li v-for="(attrValue,index) in attrs.attrValueList"
              :key="index">
            <!-- 事件委托的目标元素必须在最里面的 -->
            <a :data-prop='`${attrs.attrId}:${attrValue}:${attrs.attrName}`'>{{attrValue}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchSelector',
  props: {
    goSearch: Function,
    isSearchTrademark: String,
    isSearchProps: Array,
  },
  computed: {
    ...mapState({
      attrsList: state => state.search.attrsList,
      trademarkList: state => state.search.trademarkList
    })
  },
  methods: {
    searchTrademark (e) {
      // 获取自定义属性
      const { trademark } = e.target.dataset
      // 防止点击空白区域
      // this.isSearchTrademark 代表上一次搜索的品牌
      if (this.isSearchTrademark || !trademark) return
      this.goSearch({ trademark })
    },
    searchProps (e) {
      // 获取自定义属性
      const { prop } = e.target.dataset
      // 防止点击空白区域
      // props 多选不可重复
      // this.isSearchProps 代表上一次搜索的属性
      if (this.isSearchProps.find(item => item === prop) || !prop) return
      this.goSearch({ prop })
      console.log(prop);
    }

  }
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

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
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>