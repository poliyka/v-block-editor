<template>
  <div>
    <div class="hint">
      <div class="hint-bg" :id="BlocksIndex" :style="customStyle">
        <BaseTextBlock
          :value="value"
          :BlocksIndex="BlocksIndex"
          placeholder="輸入需要提示的內容"
          @keypress.enter.capture.stop.native
        ></BaseTextBlock>
      </div>
    </div>
    <el-dialog title="編輯" :visible.sync="visible" @closed="close">
      <el-form :model="formData">
        <el-form-item label="顔色" label-width="120px">
          <el-select
            v-model="formData.color"
            filterable
            allow-create
            placeholder="請選擇顔色"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right; font-size: 13px"
                :style="{ color: item.value }"
                >{{ item.value }}</span
              >
            </el-option>
          </el-select>
          <el-tag style="margin-left: 5px">支援 hex 色碼</el-tag>
        </el-form-item>
        <el-form-item label="文字" label-width="120px">
          <el-input v-model="formData.text" autosize type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="updateBlock(formData)"
          >確 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// TODO:支援自定義預設值以及顔色選擇器
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";
export default {
  name: "hint",
  props: ["value", "BlocksIndex"],
  components: {
    BaseTextBlock,
  },
  data() {
    return {
      formLabelWidth: "120px",
      mValue: this.value,
      options: [
        {
          value: "#409eff",
          label: "提示色",
        },
        {
          value: "#FF0000",
          label: "警告色",
        },
        {
          value: "#dfe2e5",
          label: "灰色",
        },
      ],
      formData: {
        text: this.value.text,
        color: this.value.color || "#409eff",
      },
    };
  },
  watch: {},
  methods: {
    updateBlock(formData) {
      let blockInfo = {
        index: this.BlocksIndex,
        blockItem: {
          type: this.$options.name,
          data: {
            text: formData.text,
            color: formData.color,
          },
        },
      };
      this.$store.dispatch("mainStore/setUpdateOneBlock", blockInfo);
      this.visible = false;
    },
    close() {
      this.formData = {
        text: this.value.text,
        color: this.value.color || "#409eff",
      };
    },
  },
  computed: {
    customStyle() {
      return {
        borderColor: this.value.color || "#409eff",
      };
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
.hint {
  display: flex;
  align-items: center;
  margin: 10px;
  .hint-bg {
    padding: 20px;
    background: #f2f6fc;
    width: 100%;
    border-radius: 2px;
    border-left: 3px solid #409eff;
  }

  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
    color: #303133;
    background: #f2f6fc;
  }
  textarea::-webkit-input-placeholder {
    color: #f2f6fc;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>
