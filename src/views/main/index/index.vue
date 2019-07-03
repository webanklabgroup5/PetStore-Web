<template>
  <div>
    <!-- 数字卡片 -->
    <el-row class="num-card-row">
      <el-col :span="6" :xs="24" v-for="(item, index) in numCards" :key="index" class="num-card">
        <el-card shadow="hover">
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="10">
              <el-row type="flex" align="middle" style="height:100%">
                <svg-icon :iconName="item.icon" width="48" height="48"></svg-icon>
              </el-row>
            </el-col>
            <el-col :span="14" style="text-align:end">
              <el-row class="card-label">
                <span>{{item.label}}</span>
              </el-row>
              <div style="height:10px"></div>
              <el-row class="card-num">
                <count-to :startVal="0" :endVal="item.num" :decimals="item.icon==='money'?2:0"></count-to>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <div style="height:20px;"></div>

    <el-row class="second-row">
      <el-col :span="12" :xs="24">
        <!-- 待处理事项 -->
        <el-card class="todo-cards">
          <div slot="header">
            <span>待处理事项</span>
          </div>
          <div style="height:10px"></div>
          <el-row type="flex" justify="space-around">
            <el-col :span="2" :xs="6" v-for="(item,index) in todoCards" :key="index" class="todo-card">
              <div class="todo-item">
                <div>
                  <svg-icon :iconName="item.icon" width="25" height="25"></svg-icon>
                </div>
                <div class="label">{{item.label}}</div>
                <count-to class="num" :startVal="0" :endVal="item.num"></count-to>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <div style="height:20px;"></div>

        <!-- 快速操作 -->
        <el-card class="quick-card">
          <div slot="header">
            <span>快速链接</span>
          </div>
          <el-row class="quick-button-row">
            <el-col v-for="(item, index) in quickButtons" :key="index" class="button"
              :style="{backgroundColor: item.color,cursor:item.disabled?'':'pointer'}">
              <div @mouseenter="handleMouse(1,item)" @mouseleave="handleMouse(2,item)" @click="handleClickQuick(item)"
                class="button-inner">
                <div :class="{'icon':true,'animated bounce':item.mouseEnter}">
                  <svg-icon :iconName="item.icon" width="48" height="48"></svg-icon>
                </div>
                <div class="label hidden-xs-only">
                  {{item.label}}
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
      <el-col :span="12" :xs="24">
        <!-- 缺货预警 -->
        <el-card class="lack-card">
          <div slot="header">
            <span>热销宠物</span>
          </div>
          <div>
            <cm-table :list="list" :options="options" height="300" :columns="columns"></cm-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import countTo from 'vue-count-to'
import items from './Items.json'
import 'element-ui/lib/theme-chalk/display.css'
import { mapState } from 'vuex'
export default {
  name: 'Main',
  components: {
    countTo
  },
  data() {
    return {
      // 数字卡片
      numCards: items.numCards,
      // 待处理事项
      todoCards: items.todoCards,
      // 宠物类别
      speciesItems: items.speciesItems,
      // 快速操作按钮
      quickButtons: items.quickButtons,
      // 缺货列表
      list: [],
      columns: [
        {
          prop: 'photo',
          label: '宠物图片',
          align: 'center',
          formatter: (row, column) => {
            return `<img src=${row.img_url} width="60" height="auto">`
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
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      } // table 的参数
    }
  },
  computed: {
    ...mapState(['common'])
  },
  created() {
    this.initData()
    // 解决首次进入页面，mouseEnter为true的问题。
    setTimeout(() => {
      this.quickButtons.forEach(item => {
        item.mouseEnter = false
      })
    }, 2000)
  },
  methods: {
    // 获取所有数据
    initData() {
      this.api.tradeList({limit:99999,offset:0}).then(res => {
        if (res.status === 1) {
          let totalPrice = 0
          let totalOrder = res.trade_list.length
          res.trade_list.forEach(item => {
            totalPrice += item.price
          })
          this.numCards[0].num = totalPrice
          this.numCards[1].num = totalOrder
        }
      })
      this.api.userList({limit:99999,offset:0}).then(res => {
        if (res.status === 1) {
          this.numCards[2].num = res.user_list.length
        }
      })
      this.api.petList({limit:99999,offset:0}).then(res => {
        if (res.status === 1) {
          this.numCards[3].num = res.pet_list.length
          this.list = res.pet_list.length > 5 ? res.pet_list.slice(0,5) : res.pet_list
        }
      })
    },
    // 鼠标事件
    handleMouse(type, item) {
      if (item.disabled) return
      // 1为over,2为out
      item.mouseEnter = type === 1
    },
    handleClickQuick(item) {
      switch(item.icon) {
      case 'user':
        this.$router.push({path: '/user/userlist'})
        break
      case 'pet':
        this.$router.push({path: '/pet/petlist'})
        break
      case 'market':
        this.$router.push({path: '/market/marketlist'})
        break
      case 'arbitration':
        this.$router.push({path: '/arbitration/arbitrationlist'})
        break
      case 'order':
        this.$router.push({path: '/order/orderlist'})
        break
      default:
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .num-card-row,
  .second-row,
  .quick-button-row {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 768px) {
  .todo-cards,
  .quick-card {
    margin-right: 0px !important;
  }
  .lack-card {
    margin-left: 0px !important;
    margin-top: 20px;
  }
  .label {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .quick-card {
    height: auto !important;
    .quick-button-row {
      .button {
        width: 40% !important;
        margin: 0 5%;
        margin-bottom: 20px;
      }
    }
  }
}
.num-card {
  margin-right: 40px;
  cursor: pointer;
  .card-label {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    font-weight: bold;
  }
  .card-num {
    color: #666;
    font-size: 20px;
    font-weight: bold;
  }
}
.num-card:nth-last-child(1) {
  margin-right: 0;
}
.todo-cards {
  height: 200px;
  font-size: 16px;
  margin-right: 20px;
  .todo-card {
    margin-right: 20px;
    .todo-item {
      cursor: pointer;
      text-align: center;
      line-height: 1.8;
      .label {
        color: #999;
        font-size: 12px;
      }
      .num {
        font-size: 18px;
        color: #333;
      }
    }
  }
  .todo-card:nth-last-child(1) {
    margin-right: 0;
  }
}
.lack-card {
  height: 420px;
  font-size: 16px;
  margin-left: 20px;
  overflow: auto;
}
.quick-card {
  height: 200px;
  margin-right: 20px;
  font-size: 16px;
  .button {
    height: 80px;
    width: 80px;
    border-radius: 10px;
    position: relative;
    .button-inner {
      height: 80px;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .label {
      position: absolute;
      font-size: 14px;
      width: 80px;
      color: #999;
      bottom: -25px;
      text-align: center;
    }
  }
  .button:nth-last-child(1) {
    margin-right: 0;
  }
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background: #fff;
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #ccc;
}
</style>