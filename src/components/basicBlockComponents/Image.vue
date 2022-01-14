<template>
  <div class="image">
    <img
      :src="mValue.src"
      :width="mValue.width"
      :height="mValue.height"
      @keyup.delete.prevent="deleteBlock(BlocksIndex)"
      tabindex="0"
    />

    <el-dialog
      title="編輯"
      :visible.sync="visible"
      @closed="close"
    >
      <el-form :model="formData">
        <el-form-item
          label="url"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.src"></el-input>
        </el-form-item>
        <el-form-item
          label="高度"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.width"></el-input>
        </el-form-item>
        <el-form-item
          label="寬度"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.height"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateBlock(formData)"
        >確 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 添加圖片的居中，居左，居右功能
export default {
  name: "BaseImage",
  props: ["value", "BlocksIndex"],
  components: {},
  data() {
    return {
      mValue: this.value,
      formLabelWidth: "120px",
      formData: {
        src: this.value.src,
        height: this.value.height,
        width: this.width,
      },
    };
  },
  mounted: function () { },
  watch: {
    mValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.mValue = val;
    },
  },
  methods: {
    deleteBlock(index) {
      this.$store.dispatch("mainStore/setDeletePageBlock", index);
    },
    updateBlock(formData) {
      let blockInfo = {
        index: this.BlocksIndex,
        blockItem: {
          type: "image",
          data: {
            src: formData.src,
            height: formData.height,
            width: formData.width,
          },
        },
      };
      this.$store.dispatch("mainStore/mutationUpdateOneBlock", blockInfo);
      this.visible = false;
    },
    close() {
      this.formData = this.lodash.cloneDeep(this.mValue);
    },
  },
  computed: {
    currentPageBlocks() {
      return this.$store.state.mainStore.currentPageBlocks;
    },
    dialogFormVisible() {
      return this.$store.state.mainStore.dialogFormVisible;
    },
    currentBlockIndex() {
      return this.$store.state.mainStore.currentBlockIndex;
    },
    visible: {
      get() {
        if (
          this.currentBlockIndex === this.BlocksIndex &&
          this.dialogFormVisible === true
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        this.$store.dispatch("mainStore/setUpdateDialogFormVisible", value);
      },
    },
  },
};
</script>

<style lang="less">
.image:focus {
  border: none;
  outline: none;
}
</style>
