<template>
  <div>
    <Header />
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors"
           :key="floor.id"
           :floor='floor' />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import Header from '../../components/Header'
import Brand from './Brand/Brand'
import Floor from './Floor/Floor'
import Like from './Like/Like'
import ListContainer from './ListContainer/ListContainer'
import Rank from './Rank/Rank'
import TodayRecommend from './TodayRecommend/TodayRecommend'
export default {
  name: 'Home',
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
    Header,
  },
  data () {
    return {
      floors: [],
    }
  },
  async mounted () {
    this.floors = await this.$API.mock.reqGetFloor()
  }
}
</script>

<style lang="less" scoped>
</style>