<template>
  <div class="user-container">
    <!-- 搜索栏 -->
    <el-row type="flex" align="middle" justify="end">
      <el-col :span="6" style="text-align:end">
        <el-button type="primary" @click="handleCreate({})">创建用户</el-button>
      </el-col>
    </el-row>

    <div style="height:20px"></div>

    <!-- 表格 -->
    <div class="table-container">
      <cm-table :list="list" :columns="columns" :pagination="pagination" :options="options" :total="total"></cm-table>
    </div>

    <create-user :show.sync="showCreate" :formData="formData" @afterCreate="initData"></create-user>
  </div>
</template>

<script>
import CreateUser from './CreateUser'
export default {
  name: 'UserList',
  components: {
    CreateUser
  },
  data() {
    return {
      formData: {}, // 空对象为新建用户
      showCreate: false,
      total: 0,
      list: [],
      columns: [
        {
          prop: 'userName',
          label: '用户名',
          align: 'center',
        },
        {
          prop: 'remainingCredit',
          label: '账户余额',
          align: 'center',
        },
        {
          prop: 'petList',
          label: '宠物数',
          align: 'center',
          formatter: (row, column) => {
            return row.petList.length
          }
        },
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
      const tempParams = {
        limit: this.pagination.pageSize,
        offset: (this.pagination.pageIndex-1) * this.pagination.pageSize
      }
      // this.api.userList(tempParams).then(res => {
      //   if (res.status === 0) {
      //     this.list = res.user_list
      //     this.total = res.total
      //   }
      // })
    },
    handleCreate(item) {
      this.formData = item
      this.showCreate = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
