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
            <span>快速操作</span>
          </div>
          <el-row class="quick-button-row">
            <el-col v-for="(item, index) in quickButtons" :key="index" class="button" :style="{backgroundColor: item.color,cursor:item.disabled?'':'pointer'}">
              <div @mouseenter="handleMouse(1,item)" @mouseleave="handleMouse(2,item)" class="button-inner">
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
            <span>热销商品</span>
          </div>
          <div>
            <cm-table :list="list" :options="options" height="300" :columns="columns"></cm-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="height:20px;"></div>

    <!-- 图表 -->
    <el-row>
      <el-card>
        <el-row>
          <el-col :span="4" :xs="24">
            <el-select v-model="chartType" @change="handleChangeChartType">
              <el-option label="营业额" :value="1"></el-option>
              <el-option label="销量" :value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :xs="24">
            <el-date-picker ref="datePicker" v-model="chartDate" type="month" placeholder="选择日期" value-format="yyyy-MM" 
            :clearable="false" :editable="false">
            </el-date-picker>
          </el-col>
        </el-row>
        <div>
          <ve-line ref="chart" :data="chartData" :settings="chartSettings" :data-zoom="dataZoom" :data-empty="dataEmpty"></ve-line>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import items from './Items.json'
import 'echarts/lib/component/dataZoom'
import 'v-charts/lib/style.css'
import 'element-ui/lib/theme-chalk/display.css'
import {mapState} from 'vuex'
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
      // 快速操作按钮
      quickButtons: items.quickButtons,
      // 图表类型，1为营业额，2为销量
      chartType: 1,
      // 图表日期
      chartDate: '',
      // 图表是否无数据
      dataEmpty: false,
      // 缩放
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ],
      // 图表数据
      chartData: {
        columns: ['date', 'lens', 'glass'],
        rows: [
          { date: '06-06', lens: 5000, glass: 100 },
          { date: '06-07', lens: 5020, glass: 200 },
          { date: '06-08', lens: 5400, glass: 400 },
          { date: '06-09', lens: 4000, glass: 500 },
          { date: '06-10', lens: 5020, glass: 200 },
          { date: '06-11', lens: 5400, glass: 400 },
          { date: '06-12', lens: 4000, glass: 500 }
        ],
      },
      chartSettings: {
        labelMap: {
          'lens': '镜片',
          'glass': '镜架'
        },
        yAxisName: ['金额(元)'],
        xAxisName: ['日期']
      },
      // 缺货列表
      list: [
        {
          id: 1,
          name: '高清透明镜片',
          type_id: 1,
          type: '镜片',
          sold_count: 10,
          num: 10
        },
        {
          id: 2,
          name: '高清蓝光镜片',
          type_id: 2,
          type: '镜片',
          sold_count: 20,
          num: 3
        },
      ],
      columns: [
        {
          prop: 'id',
          label: '商品编号',
          align: 'center'
        },
        {
          prop: 'name',
          label: '商品名称',
          align: 'center',
        },
        {
          prop: 'type_id',
          label: '款型编号',
          align: 'center',
        },
        {
          prop: 'sold_count',
          label: '销量',
          align: 'center',
        },
        {
          prop: 'num',
          label: '库存',
          align: 'center',
          formatter: (row, column) => {
            if (row.num < 5) return `<span style="color:red;font-weight:bold;">${row.num}</span>`
            else return `${row.num}`
          }
        },
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
  watch: {
    // 当侧边栏宽度变化时，图表要动态渲染。
    'common.isCollapse': function() {
      setTimeout(() => {
        this.$refs['chart'].echarts.resize()
      }, 400)
    }
  },
  created() {
    this.getNowMonth()
    this.dataZoom[0].end = this.common.isMobile? 20 : 100
    this.dataZoom[0].maxSpan = this.common.isMobile? 20 : 100
    // 解决首次进入页面，mouseEnter为true的问题。
    setTimeout(() => {
      this.quickButtons.forEach(item => {
        item.mouseEnter = false
      })
    }, 2000)
  },
  methods: {
    // 获取当前月份
    getNowMonth() {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      month = month > 9 ? `${month}` : `0${month}`
      this.chartDate = `${year}-${month}`
    },
    // 鼠标事件
    handleMouse(type, item) {
      if (item.disabled) return
      // 1为over,2为out
      item.mouseEnter = type === 1
    },
    handleChangeChartType() {
      if (this.chartType === 1) {
        this.chartSettings.yAxisName = ['金额(元)']
        this.chartData.rows = [
          { date: '06-06', lens: 5000, glass: 100 },
          { date: '06-07', lens: 5020, glass: 200 },
          { date: '06-08', lens: 5400, glass: 400 },
          { date: '06-09', lens: 4000, glass: 500 },
          { date: '06-10', lens: 5020, glass: 200 },
          { date: '06-11', lens: 5400, glass: 400 },
          { date: '06-12', lens: 4000, glass: 500 },
        ]
      } else {
        this.chartSettings.yAxisName = ['销量(件)']
        this.chartData.rows = [
          { date: '06-06', lens: 50, glass: 10 },
          { date: '06-07', lens: 50, glass: 20 },
          { date: '06-08', lens: 50, glass: 40 },
          { date: '06-09', lens: 400, glass: 50 },
          { date: '06-10', lens: 50, glass: 0 },
          { date: '06-11', lens: 50, glass: 0 },
          { date: '06-12', lens: 400, glass: 50 },
        ]
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