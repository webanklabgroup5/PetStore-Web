<template>
  <div class="user-container">
    <!-- 搜索栏 -->
    <!-- <el-row type="flex" align="middle" justify="end">
      <el-col :span="6" style="text-align:end">
        <el-button type="primary" @click="handleCreate({})">创建宠物</el-button>
      </el-col>
    </el-row>

    <div style="height:20px"></div>
 -->
    <!-- 表格 -->
    <div class="table-container">
      <cm-table :list="list" :columns="columns" :pagination="pagination" :options="options" :total="total"></cm-table>
    </div>

    <!-- <create-pet :show.sync="showCreate" :formData="formData" @afterCreate="initData"></create-pet>

    <el-dialog :visible.sync="showStatus" title="宠物上架" width="30%">
      <el-form :model="form" :rules="rules" prop="form" label-width="100px">
        <el-form-item label="宠物价格" prop="price">
          <el-input v-model="form.price" type="number" placeholder="请输入宠物价格" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">确定上架</el-button>
          <el-button @click="showStatus=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->

  </div>
</template>

<script>
import items from './Items.json'
// import CreatePet from './CreatePet'
export default {
  name: 'PetList',
  data() {
    return {
      total: 0,
      speciesItems: items.speciesItems,
      list: [],
      columns: [
        {
          prop: 'photo',
          label: '宠物图片',
          align: 'center',
          formatter: (row, column) => {
            return `<img src=${row.img_url} width="80" height="auto">`
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
            return this.speciesItems.find(item => item.value === row.species).label
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
        {
          prop: 'status',
          label: '宠物状态',
          align: 'center',
          render: (h, params) => {
            let item = params.row
            return h('el-tag', {
              props: { type: item.status === 1 ? 'success' : 'info' }
            }, item.status === 1 ? '上架中' : '已下架')
          }
        },
        {
          prop: 'price',
          label: '宠物价格',
          align: 'center',
          formatter: (row, column) => {
            return row.status === 1 ? row.price : '/'
          }
        },
        {
          prop: 'owner',
          label: '主人',
          align: 'center',
          formatter: (row, column) => {
            return row.owner? row.owner.user_name : ''
          }
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
      const tempParams = {
        limit: this.pagination.pageSize,
        offset: (this.pagination.pageIndex - 1) * this.pagination.pageSize
      }
      this.api.petList(tempParams).then(res => {
        if (res.status === 1) {
          this.list = res.pet_list
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
  }
}
</script>

<style lang="scss" scoped>
</style>