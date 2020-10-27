<template>
  <div class="image" @keyup="nextFocus($event, BlocksIndex)">
    <img
      :src="mValue.src"
      :width="mValue.width"
      :height="mValue.height"
      @click="visible = true"
    />

    <el-dialog title="编辑" :visible.sync="visible">
      <el-form :model="mValue">
        <el-form-item label="url" :label-width="formLabelWidth">
          <el-input v-model="mValue.src" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="高度" :label-width="formLabelWidth">
          <el-input v-model="mValue.width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宽度" :label-width="formLabelWidth">
          <el-input v-model="mValue.height" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageBlockFocusMixin from "@/components/mixin/ImageBlockFocusMixin";
export default {
  name: "BaseImage",
  props: ["value", "BlocksIndex"],
  mixins: [ImageBlockFocusMixin],
  components: {},
  data() {
    return {
      mValue: this.value,
      formLabelWidth: "120px",
    };
  },
  mounted: function () {},
  watch: {
    mValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.mValue = val;
    },
  },
  methods: {
    updaet() {},
    test() {
      this.dialogFormVisible = true;
    },
  },
  computed: {
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
    dialogFormVisible() {
      return this.$store.state.dialogFormVisible;
    },
    currentBlockIndex() {
      return this.$store.state.currentBlockIndex;
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
        this.$store.commit("mutationUpdateDialogFormVisible", value);
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