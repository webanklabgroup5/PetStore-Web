<template>
  <div class="user-container">
    <div class="table-container">
      <cm-table :list="list" :columns="columns" :operates="operates" :pagination="pagination" :options="options" :total="total"></cm-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArbitrationList',
  data() {
    return {
      total: 0,
      list: [],
      columns: [
        {
          prop: 'buyer',
          label: '买家',
          align: 'center',
          formatter: (row, column) => {
            return row.buyer? row.buyer.user_name : ''
          }
        },
        {
          prop: '',
          label: '卖家',
          align: 'center',
          formatter: (row, column) => {
            return row.seller? row.seller.user_name : ''
          }
        },
        {
          prop: '',
          label: '宠物名',
          align: 'center',
          formatter: (row, column) => {
            return row.pet? row.pet.name : ''
          }
        },
        {
          prop: 'price',
          label: '订单金额',
          align: 'center',
        },
        {
          prop: 'reason',
          label: '仲裁理由',
          align: 'center',
        }
      ], // 需要展示的列
      operates: {
        width: 200,
        list: [
          {
            label: '同意',
            type: 'success',
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.handleApply(row, 1)
            }
          },
          {
            label: '拒绝',
            type: 'danger',
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.handleApply(row, 0)
            }
          }
        ]
      },
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
      const tempParams = {
        limit: this.pagination.pageSize,
        offset: (this.pagination.pageIndex - 1) * this.pagination.pageSize
      }
      this.api.arbitrationList(tempParams).then(res => {
        if (res.status === 1) {
          this.list = res.arbitration_list
          this.total = res.total
        }
      })
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
    handleApply(item, action) {
      this.$confirm('确定该操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tempData = {
          arbitration_id: item.id,
          action
        }
        this.api.judge(tempData).then(res => {
          if (res.status === 1) {
            this.$message.success('仲裁成功！')
            this.initData()
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>