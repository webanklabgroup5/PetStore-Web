<template>
  <el-dialog :visible.sync="showTemp" :title="titleText" width="40%">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" v-if="showTemp">
      <el-form-item v-for="(value, key) in form" :key="key" :label="labels[key]" :prop="key">
        <el-select v-if="selectKeys.includes(key)" v-model="form[key]" :placeholder="'请选择'+labels[key]">
          <el-option v-for="(item,index) in items[key]" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-else-if="key==='birthday'" v-model="form[key]" type="date" :placeholder="'请选择'+labels[key]"
          value-format="yyyy-MM-dd"></el-date-picker>
        <el-upload v-else-if="key==='photo'" v-loading="uploading" class="avatar-uploader" :action="uploadUrl"
          name="photo" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.photo" :src="form.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-else-if="inputKeys.includes(key)" v-model="form[key]" :placeholder="'请填写'+labels[key]"
          style="width:60%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{buttonText}}</el-button>
        <el-button @click="showTemp=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import items from './Items.json'
export default {
  props: {
    show: Boolean,
    formData: Object
  },
  data() {
    return {
      isEdit: false, // 编辑模式
      showTemp: false,
      uploadUrl: '', // 上传url
      uploading: false,
      form: {
        name: '',
        species: '',
        birthday: '',
        description: '',
        photo: ''
      },
      labels: {
        name: '宠物名字',
        species: '宠物品种',
        birthday: '宠物生日',
        description: '宠物描述',
        photo: '宠物图片'
      },
      items: {
        species: items.speciesItems
      },
      inputKeys: ['name', 'description'], // 输入框的key
      selectKeys: ['species']
    }
  },
  computed: {
    titleText() {
      return this.isEdit ? '修改宠物' : '新增宠物'
    },
    buttonText() {
      return this.isEdit ? '确认修改' : '确认创建'
    },
    rules() {
      let tempRules = {}
      for (let key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          tempRules[key] = [{ required: true, message: `请填写${this.labels[key]}` }]
        }
      }
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
      this.isEdit = !!val.name // 利用name判断是否为编辑
      for (let key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.isEdit ? val[key] : ''
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let tempData = this.form
          // let p
          // if (this.isEdit) {
          //   const tempQuery = {
          //     id: this.formData.id
          //   }
          //   p = this.api.putCourses(tempData,tempQuery)
          // } else {
          //   p = this.api.postCourses(tempData)
          // }
          this.api.petAdd(tempData).then(res => {
            if (res.status === 0) {
              this.showTemp = false
              this.$message.success(this.isEdit ? '修改成功！' : '创建成功！')
              this.$emit('afterCreate')
            }
          })
        }
      })
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      this.uploading = true
      if (!isImg) {
        this.$message.error('只能上传png或jpg格式')
        this.uploading = false
        return false
      }
      return true
    },
    handleAvatarSuccess(res, file) {
      this.uploading = false
      this.form.photo = URL.createObjectURL(file.raw)
      // if (res.status !== 0) {
      //   this.$message.error(res.msg)
      // } else {
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
$avatar-width: 200px;
$avatar-height: 200px;
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: $avatar-width;
  height: $avatar-height;
  line-height: $avatar-height;
  text-align: center;
}
.avatar-uploader {
  width: $avatar-width;
}
.avatar {
  width: $avatar-width;
  height: $avatar-height;
  display: block;
}
</style>