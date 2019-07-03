const userColumns = [
  {
    prop: 'user_name',
    label: '用户名',
    align: 'center',
  },
  {
    prop: 'credit',
    label: '账户余额',
    align: 'center',
  },
  {
    prop: 'petList',
    label: '宠物数',
    align: 'center',
    formatter: (row, column) => {
      return row.petList? row.petList.length : 0
    }
  }
]

const applyColumns = [
  {
    prop: 'user_name',
    label: '用户名',
    align: 'center'
  },
  {
    prop: 'credit',
    label: '账户余额',
    align: 'center',
  }
]

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
    columns: userColumns
  },
  2: {
    columns: applyColumns
  }
}

export default {
  list,
  typeItems
}