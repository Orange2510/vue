<template>
  <div class="pagination">
    <div class="pagination-btns">
      <button><i class="iconfont icon-direction-left"></i></button>
      <button class="active">1</button>
      <button class="iconfont icon-elipsis"></button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="iconfont icon-elipsis"></button>
      <button>{{totalPages}}</button>
      <button class="iconfont icon-direction-right"></button>
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
      myCurrentPage: 10,
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

      // 特殊情况4
      if (totalPages <= 2) {
        return {
          start: 0,
          end: 0,
        };
      }

      // 特殊情况3
      if (pagerCount <= totalPages) {
        return {
          start: 2,
          end: totalPages - 1,
        };
      }

      // 计算开始
      let start = myCurrentPage - (pagerCount - 3) / 2;

      // 特殊情况1
      if (start < 2) {
        start = 2;
      }

      // 计算结束
      let end = start + pagerCount - 3;

      // 特殊情况2
      if (end >= totalPages) {
        end = totalPages - 1;
        start = end - (pagerCount - 3);
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