<template>
  <div class="user-container">
    <!-- 搜索栏 -->
    <el-row type="flex" align="middle" justify="end">
      <el-col :span="6" style="text-align:end">
        <el-button type="primary" @click="handleCreate({})">创建宠物</el-button>
      </el-col>
    </el-row>

    <div style="height:20px"></div>

    <!-- 表格 -->
    <div class="table-container">
      <cm-table :list="list" :columns="columns" :pagination="pagination" :options="options" :total="total"></cm-table>
    </div>

    <create-pet :show.sync="showCreate" :formData="formData" @afterCreate="initData"></create-pet>

  </div>
</template>

<script>
import items from './Items.json'
import CreatePet from './CreatePet'
export default {
  name: 'PetList',
  components: {
    CreatePet
  },
  data() {
    return {
      formData: {},
      showCreate: false,
      total: 0,
      speciesItems: items.speciesItems,
      list: [],
      columns: [
        {
          prop: 'photo',
          label: '宠物图片',
          align: 'center',
          formatter: (row, column) => {
            return `<img src=${row.photo} width="80" height="auto">`
          }
        },
        {
          prop: 'name',
          label: '宠物名字',
          align: 'center',
        },
        {
          prop: 'species',
          label: '宠物品种',
          align: 'center',
          formatter: (row, column) => {
            return this.speciesItems.find(item => item.value === row.species)
          }
        },
        {
          prop: 'birthday',
          label: '宠物生日',
          align: 'center',
        },
        {
          prop: 'description',
          label: '宠物描述',
          align: 'center',
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
      // this.api.petList(tempParams).then(res => {
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