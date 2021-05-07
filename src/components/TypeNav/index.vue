<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2"
             @click.prevent="goSearch">
          <!-- 一级分类 -->
          <div class="item bo"
               v-for="h1 in categoryList"
               :key="h1.categoryId">
            <h3>
              <a :data-categoryName="h1.categoryName"
                 :data-categoryId="h1.categoryId"
                 :data-level='1'
                 href="">{{h1.categoryName}}</a>
            </h3>
            <!-- 二级分类 -->
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore"
                    v-for="h2 in h1.categoryChild"
                    :key="h2.categoryId">
                  <dt>
                    <a :data-categoryName="h2.categoryName"
                       :data-categoryId="h2.categoryId"
                       :data-level='2'
                       href="">{{h2.categoryName}}</a>

                  </dt>
                  <!-- 三级分类 -->
                  <dd>
                    <em v-for="h3 in h2.categoryChild"
                        :key="h3.categoryId">
                      <a :data-categoryName="h3.categoryName"
                         :data-categoryId="h3.categoryId"
                         :data-level='3'
                         href="">{{h3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeNav',
  data () {
    return {
      categoryList: [],
    }
  },
  // 发送请求获取数据
  async mounted () {
    try {
      const res = await this.$API.home.reqGetBaseCategoryList()
      this.categoryList = res.slice(0, 16)
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    // 实现事件委托
    goSearch (e) {
      // 获取当前点击元素的自定义属性
      const { categoryid, categoryname, level } = e.target.dataset
      // 点击非自定义属性禁止跳转
      if (!level) {
        return
      }
      // 编程式导航跳转
      this.$router.history.push({
        name: 'Search',
        // query参数会添加到url中
        query: {
          categoryName: categoryname,
          [`category${level}Id`]: categoryid,
        }
      })
    }
  },
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            margin: 0;
            padding: 0 20px;

            a {
              color: #333;
              width: 100%;
              height: 100%;
              display: block;
              padding: 0 20px 0 0;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            background-color: pink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
