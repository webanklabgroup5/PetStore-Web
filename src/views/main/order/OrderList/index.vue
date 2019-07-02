<template>
  <div class="user-container">
    <div class="table-container">
      <cm-table :list="list" :columns="columns" :pagination="pagination" :options="options" :total="total"></cm-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      total: 0,
      list: [],
      columns: [
        {
          prop: '',
          label: '买家',
          align: 'center',
        },
        {
          prop: '',
          label: '卖家',
          align: 'center',
        },
        {
          prop: '',
          label: '宠物名',
          align: 'center',
        },
        {
          prop: '',
          label: '订单金额',
          align: 'center',
        },
        {
          prop: '',
          label: '创建时间',
          align: 'center',
        }
      ], // 需要展示的列
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
  created() {
    this.initData()
  },
  methods: {
    initData() {
    },
  }
}
</script>

<style lang="scss" scoped>
</style>