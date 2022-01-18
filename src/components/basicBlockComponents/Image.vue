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
      :title="$t('root.modify')"
      :visible.sync="visible"
      @closed="close"
    >
      <el-form :model="formData">
        <el-form-item
          :label="$t('dialog.image.url.label')"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.src"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('dialog.image.height.label')"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.width"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('dialog.image.width.label')"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formData.height"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">{{ $t('root.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="updateBlock(formData)"
        >{{ $t('root.confirm') }}</el-button>
      </template>
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
