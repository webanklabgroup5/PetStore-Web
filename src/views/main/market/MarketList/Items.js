const petColumns = [
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
  }
]

const petOperates = {
  list: []
}

const sellerColumns = [
  {
    prop: 'userName',
    label: '用户名',
    align: 'center'
  },
  {
    prop: 'remainingCredit',
    label: '账户余额',
    align: 'center',
  }
]

const sellerOperates = {
  width: 200,
  list: [
    {
      label: '同意',
      type: 'success',
      icon: 'el-icon-edit',
      method: (index, row) => {
        this.handleApply(row)
      }
    },
    {
      label: '拒绝',
      type: 'danger',
      icon: 'el-icon-edit',
      method: (index, row) => {
        this.handleApply(row)
      }
    }
  ]
}

const typeItems = [
  {
    name: '宠物列表',
    id: 1
  },
  {
    name: '商家列表',
    id: 2
  },
]

const list = {
  1: {
    columns: petColumns,
    operates: petOperates
  },
  2: {
    columns: sellerColumns,
    operates: sellerOperates
  }
}

export default {
  list,
  typeItems
}