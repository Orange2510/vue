<template>
  <div class="pagination">
    <div class="pagination-btns">
      <button><i class="iconfont icon-direction-left"></i></button>
      <button :class="{active: myCurrentPage === 1}"
              @click="myCurrentPage = 1">1</button>
      <button class="iconfont icon-elipsis"
              v-show="myCurrentPage !== 1"></button>
      <!-- 6-2+1 =5  五个按钮   2 + index    当前页码 === 当前遍历按钮 -->
      <button v-for="(num,index) in startEnd.end - startEnd.start + 1"
              :key="index"
              :class="{active: myCurrentPage === startEnd.start + index}"
              @click="myCurrentPage=startEnd.start + index"> {{startEnd.start + index}} </button>
      <!-- 1 ... 2 3 [4] 5 6 ... 12 -->
      <button class="iconfont icon-elipsis"
              v-show="myCurrentPage !== totalPages"></button>
      <button :class="{active: myCurrentPage === totalPages}"
              @click="myCurrentPage = totalPages">{{totalPages}}
      </button>
      <button class="
              iconfont
              icon-direction-right"></button>
    </div>
    <select class="pagination-select"
            v-model="myPageSize">
      <option value="5">每页 5 条</option>
      <option value="10">每页 10 条</option>
      <option value="15">每页 15 条</option>
      <option value="20">每页 20 条</option>
    </select>
    <span class="pagination-total">共{{total}}条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data () {
    return {
      myPageSize: this.pageSize,
      myCurrentPage: 11,
    }
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    "pager-count": {
      type: Number,
      default: 7,
      validator (val) {
        return val >= 5 && val <= 21 && val % 2 === 1
      }
    }
  },
  computed: {
    totalPages () {
      // 总数 / 每页条数 = 总页数
      return Math.ceil(this.total / this.myPageSize)
    },

    startEnd () {
      //   当前页码 myCurrentPage
      //   每页显示按钮的数量 pagerCount
      //   总页数 totalPages

      const { myCurrentPage, pagerCount, totalPages } = this;

      const MAX_END_VALUE = totalPages - 1
      const MIDDLE_BTNS_COUNT = pagerCount - 3
      // 特殊情况4
      if (totalPages <= 2) {
        return {
          start: 0,
          end: -1,
        };
      }
      // 特殊情况3
      if (totalPages <= pagerCount) {
        return {
          start: 2,
          end: MAX_END_VALUE,
        };
      }

      // 计算开始
      let start = myCurrentPage - MIDDLE_BTNS_COUNT / 2;

      // 特殊情况1
      if (start < 2) {
        start = 2;
      }
      // 计算结束
      let end = start + MIDDLE_BTNS_COUNT;

      // 特殊情况2
      if (end >= totalPages) {
        end = MAX_END_VALUE;
        start = end - MIDDLE_BTNS_COUNT;
      }

      return {
        start,
        end,
      };
    },
  },
}
</script>

<style lang='less' scoped>
.pagination {
  display: flex;
  align-items: center;
}
.pagination-btns {
  display: flex;
  align-items: center;
}
.pagination-btns button {
  color: #333;
  width: 35px;
  height: 30px;
  border: none;
  background-color: #f4f4f5;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 3px;
  &.active {
    color: #fff;
    background-color: #409eff;
  }
}
.pagination-select {
  height: 30px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 5px;
  color: #333;
  margin: 0 10px;
}
.pagination-total {
  font-size: 14px;
  color: #333;
}
</style>