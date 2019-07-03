<template>
  <div class="user-container">
    <el-menu default-active="1" mode="horizontal" @select="handleChangeType">
      <el-menu-item v-for="(item,index) in typeItems" :key="index" :index="''+item.id">{{item.name}}</el-menu-item>
    </el-menu>
    <!-- 表格 -->
    <div class="table-container">
      <cm-table :list="list" :columns="columns" :pagination="pagination" :options="options"
        :total="total"></cm-table>
    </div>
  </div>
</template>

<script>
import items from './Items'
export default {
  name: 'MarketList',
  data() {
    return {
      type: {id: 1, label: '宠物列表'}, // 1为用户列表，2为申请列表
      typeItems: items.typeItems,
      total: 0,
      list: [],
      pagination: {
        pageIndex: 1,
        pageSize: 20,
      }, // 分页参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      } // table 的参数
    }
  },
  computed: {
    columns() {
      return items.list[this.type.id].columns
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(type = 0) {
      // type为0时为默认获取数据情况，为1时是切换类型情况
      if (type) {
        this.pagination = { pageIndex: 1, pageSize: 20 }
      }
      const tempParams = {
        limit: this.pagination.pageSize,
        offset: (this.pagination.pageIndex - 1) * this.pagination.pageSize
      }
      let p
      if (this.type.id === 1) {
        p = this.api.marketPetList(tempParams)
      } else if (this.type.id === 2) {
        p = this.api.marketUserList(tempParams)
      }
      p.then(res => {
        if (res.status === 1) {
          this.list = this.type.id === 1 ? res.pet_list : res.user_list
          this.total = res.total
        }
      })
    },
    // 切换类型
    handleChangeType(index) {
      this.type = this.typeItems.find(item => parseInt(index) === item.id)
      this.initData(1)
    },
    // 切换每页显示的数量
    handleSizeChange(pagination) {
      this.pagination = pagination
      this.initData()
    },
    // 切换页码
    handleIndexChange(pagination) {
      this.pagination = pagination
      this.initData()
    },
  }
}
</script>

<style lang="scss" scoped>
</style>