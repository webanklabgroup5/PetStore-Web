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
      <cm-table :list="list" :columns="columns" :pagination="pagination" :options="options" :total="total"
        :operates="operates"></cm-table>
    </div>

    <create-pet :show.sync="showCreate" :formData="formData" @afterCreate="initData"></create-pet>

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
    </el-dialog>

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
      form: { // 上架宠物的表单
        price: null
      },
      rules: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ]
      },
      showCreate: false,
      showStatus: false,
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
        {
          prop: 'status',
          label: '宠物状态',
          align: 'center',
          render: (h, params) => {
            let item = params.row
            return h('el-tag', {
              props: { type: item.status === 0 ? 'success' : 'info' }
            }, item.status === 0 ? '上架中' : '已下架')
          }
        },
        {
          prop: 'price',
          label: '宠物价格',
          align: 'center',
          formatter: (row, column) => {
            return row.status === 0 ? row.price : '/'
          }
        },
      ], // 需要展示的列
      operates: {
        width: 90,
        list: [
          {
            label: '上架',
            type: 'success',
            show: (index, row) => {
              return row.status === 1
            },
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.handleChangeStatus(row)
            }
          },
          {
            label: '下架',
            type: 'danger',
            show: (index, row) => {
              return row.status === 0
            },
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.handleChangeStatus(row)
            }
          }
        ]
      }, // 操作按钮组
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
      this.list = this.$store.state.user.user.petList
    },
    handleCreate(item) {
      this.formData = item
      this.showCreate = true
    },
    handleChangeStatus(item) {
      this.formData = item
      if (this.formData.status === 0) {
        this.$confirm('确定将该宠物下架吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const tempData = { id: this.formData.id }
          this.api.petDown(tempData).then(res => {
            if (res.status === 0) {
              this.$message.success('下架成功!')
            }
          })
        }).catch(() => { })
      } else {
        this.showStatus = true
      }
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let tempData = {
            id: this.formData.id,
            price: this.form.price
          }
          this.api.petOn(tempData).then(res => {
            if (res.status === 0) {
              this.showStatus = false
              this.$message.success('上架成功！')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>