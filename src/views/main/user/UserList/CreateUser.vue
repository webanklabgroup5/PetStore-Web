<template>
  <el-dialog :visible.sync="showTemp" :title="titleText" width="40%">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" v-if="showTemp">
      <el-form-item v-for="(value, key) in form" :key="key" :label="labels[key]" :prop="key">
        <el-input v-if="inputKeys.includes(key)" v-model="form[key]" :placeholder="'请填写'+labels[key]" style="width:60%" 
        :type="key==='credit'?'number':(key==='passwd'||key==='confirm_passwd')?'password':''"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{buttonText}}</el-button>
        <el-button @click="showTemp=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    formData: Object,
    isRegister: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkConfirm: (rule, value, callback) => {
        if (!this.form.passwd) return callback()
        else {
          if (this.form.passwd!==this.form.confirm_passwd) {
            return callback(new Error('两次密码不一致'))
          }
          else {
            return callback()
          }
        }
      },
      isEdit: false, // 编辑模式
      showTemp: false,
      form: {
        user_name: '',
        credit: '',
        passwd: '',
        confirm_passwd: ''
      },
      labels: {
        user_name: '用户名',
        credit: '用户资产',
        passwd: '用户密码',
        confirm_passwd: '确认密码'
      },
      inputKeys: ['user_name', 'credit', 'passwd', 'confirm_passwd'] // 输入框的key
    }
  },
  computed: {
    titleText() {
      return this.isEdit ? '修改用户' : this.isRegister? '注册用户' : '新增用户'
    },
    buttonText() {
      return this.isEdit ? '确认修改' : this.isRegister? '申请注册' : '确认创建'
    },
    rules() {
      let tempRules = {}
      for (let key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          tempRules[key] = [{ required: true, message: `请填写${this.labels[key]}` }]
        }
      }
      tempRules.confirm_passwd.push({ validator: this.checkConfirm })
      return tempRules
    }
  },
  watch: {
    show(val) {
      this.showTemp = val
    },
    showTemp(val) {
      this.$emit('update:show', val)
    },
    formData(val) {
      this.isEdit = !!val.user_name // 利用name判断是否为编辑
      for (let key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.isEdit? val[key] : ''
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let tempData = {
            user_name: this.form.user_name,
            credit: this.form.credit,
            passwd: this.form.passwd
          }
          // let p
          // if (this.isEdit) {
          //   const tempQuery = {
          //     id: this.formData.id
          //   }
          //   p = this.api.putCourses(tempData,tempQuery)
          // } else {
          //   p = this.api.postCourses(tempData)
          // }
          this.api.userAdd(tempData).then(res => {
            if (res.status === 0) {
              this.showTemp = false
              this.$message.success(this.isEdit ? '修改成功！' : '创建成功！')
              this.$emit('afterCreate')
            }
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>