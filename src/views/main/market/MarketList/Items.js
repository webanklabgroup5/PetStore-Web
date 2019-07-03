const petColumns = [
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
      return speciesItems.find(item => item.value === row.species).label
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
]

const sellerColumns = [
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
    label: '热卖宠物',
    align: 'center',
    formatter: (row, column) => {
      return row.pet_list? 
        `<div style="display:flex;align-items:center;">
        <img src=${row.pet_list[0].img_url} width="60" height="auto"><span style="padding-left:10px">${row.pet_list[0].name}</span>
        </div>`
        : ''
    }
  }
]

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
    columns: petColumns
  },
  2: {
    columns: sellerColumns
  }
}

const speciesItems = [
  {
    'label': '狗',
    'value': 1
  },
  {
    'label': '猫',
    'value': 2
  },
  {
    'label': '仓鼠',
    'value': 3
  },
  {
    'label': '兔',
    'value': 4
  },
  {
    'label': '恐龙',
    'value': 5
  },
  {
    'label': '其他',
    'value': 0
  }
]

export default {
  list,
  typeItems,
  speciesItems
}