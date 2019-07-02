const _import = require('./_import_' + process.env.NODE_ENV)

const routes = [{
  path: '/',
  redirect: 'main',
  name: '',
  meta: {
    requireAuth: true
  },
  component: _import('layout/index'),
  children: [{
    path: '/main',
    name: 'Main',
    meta: {
      routeText: '首页',
      routeIcon: 'el-icon-goods',
      showSideBar: true
    },
    component: _import('main/index/index')
  }]
},
{
  path: '/user',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'userlist',
    name: 'UserList',
    meta: {
      routeText: '用户模块',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/user/UserList/index')
  }]
},
{
  path: '/pet',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'petlist',
    name: 'PetList',
    meta: {
      routeText: '宠物模块',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/pet/PetList/index')
  }]
},
{
  path: '/market',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'marketlist',
    name: 'MarketList',
    meta: {
      routeText: '市场模块',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/market/MarketList/index')
  }]
},
{
  path: '/arbitration',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'arbitrationlist',
    name: 'ArbitrationList',
    meta: {
      routeText: '仲裁模块',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/arbitration/ArbitrationList/index')
  }]
},
{
  path: '/order',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'orderlist',
    name: 'OrderList',
    meta: {
      routeText: '订单模块',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/order/OrderList/index')
  }]
},
]

export default routes