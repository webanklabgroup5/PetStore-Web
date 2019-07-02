const userColumns = [
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

const userOperates = {
  list: []
}

const applyColumns = [
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

const applyOperates = {
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
    name: '用户列表',
    id: 1
  },
  {
    name: '申请列表',
    id: 2
  },
]

const list = {
  1: {
    columns: userColumns,
    operates: userOperates
  },
  2: {
    columns: applyColumns,
    operates: applyOperates
  }
}

export default {
  list,
  typeItems
}